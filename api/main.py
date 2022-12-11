# app.py

# Required imports
import logging
import os
from flask import Flask, request, jsonify, render_template, abort
from firebase_admin import db, credentials, initialize_app
import openai
from flask_cors import CORS
from prompt_engine import PromptEngine

import time
from datetime import datetime
import google.cloud.logging as glogging
import sys

client = glogging.Client()
client.setup_logging()
logging.basicConfig(level=logging.DEBUG)
root = logging.getLogger()
handler = logging.StreamHandler(sys.stdout)
root.addHandler(handler)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
databaseURL = 'https://brisk-d3f02-default-rtdb.firebaseio.com/'
default_app = initialize_app(cred, {
    'databaseURL': databaseURL
})

MAX_TOKENS = 3000
TEMPERATURE = 0
MODEL = "text-davinci-003"


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/transform', methods=['POST'])
def create():
    # Get data from the OpenAI API
    try:
        article = request.json['article']
        lexile = request.json['lexile']
        prompt = PromptEngine.get_prompt(lexile, article)
        # create a completion
        app.logger.info("Calling Completion API...")
        start = time.perf_counter()

        print(os.environ["OPENAI_API_KEY"])
        completion = openai.Completion.create(
            model=MODEL, prompt=prompt, temperature=TEMPERATURE, max_tokens=MAX_TOKENS, echo=False)
        request_time = time.perf_counter() - start
        app.logger.info(
            "OpenAI Completion request completed in {0:.0f}ms".format(request_time))
        created_article = completion.choices[0].text
        app.logger.info(
            f"Received completion used {completion.usage.total_tokens} total tokens")
    except Exception as e:
        print(e)
        app.logger.error(f"An Error Occurred in OpenAI: {e}")
        abort(500)
        return

    try:
        firebase_start = time.perf_counter()
        # Create records in Firebase DB
        prompt_ref = db.reference('/promptArticles')
        prompt_result = prompt_ref.push(
            {"articleContent": article, "createdAt": datetime.utcnow().isoformat()})

        created_ref = db.reference('/createdArticles')
        created_result = created_ref.push(
            {"articleContent": created_article, "createdAt": datetime.utcnow().isoformat(), "promptId": prompt_result.key})

        map_ref = db.reference('/articleMap')
        map_result = map_ref.push(
            {"promptId": prompt_result.key, "createdId": created_result.key})
        firebase_time = time.perf_counter() - firebase_start
        app.logger.info(
            "Firebase Completion request completed in {0:.0f}ms".format(firebase_time))

        # TODO: make a class for the return result
        return jsonify(created_result.get()), 200
    except Exception as e:
        print(f"An Error Occurred in Firebase: {e}")
        abort(500)
        return


@ app.route('/list', methods=['GET'])
def read():
    try:
        # Check if ID was passed to URL query
        todo_id = request.args.get('id')
        # if todo_id:
        #     todo = collection_ref.document(todo_id).get()
        #     return jsonify(todo.to_dict()), 200
        # else:
        #     all_todos = [doc.to_dict() for doc in collection_ref.stream()]
        #     return jsonify(all_todos), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@ app.route('/update', methods=['POST', 'PUT'])
def update():
    try:
        id = request.json['id']
        # collection_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@ app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        # collection_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port, debug=True)
