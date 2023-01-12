# app.py

# Required imports
import logging
import os
from flask import Flask, request, jsonify, render_template, abort
from firebase_admin import db, credentials, initialize_app
import openai
from flask_cors import CORS
from prompt_engine import PromptEngine
from tool_engine import ToolEngine
import time
from datetime import datetime
import google.cloud.logging as glogging
import sys
import concurrent.futures
from langchain import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import time
from examples import exampleCheck 

# client = glogging.Client()
# client.setup_logging()
# logging.basicConfig(level=logging.DEBUG)
# root = logging.getLogger()
# handler = logging.StreamHandler(sys.stdout)
# root.addHandler(handler)

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# # Initialize Firestore DB
# cred = credentials.Certificate('key.json')
# databaseURL = 'https://brisk-d3f02-default-rtdb.firebaseio.com/'
# default_app = initialize_app(cred, {
#     'databaseURL': databaseURL
# })

MAX_TOKENS = 2000
TEMPERATURE = 0
MODEL = "text-davinci-003"


@app.route('/')
def root():
    return render_template('index.html')


def get_completion(prompt_and_token):
    try:
        prompt, tokens_left = prompt_and_token
        app.logger.info("Calling Completion API...")
        start = time.perf_counter()
        completion = openai.Completion.create(
            model=MODEL, prompt=prompt, temperature=TEMPERATURE, max_tokens=int(tokens_left), echo=False)
        request_time = time.perf_counter() - start
        app.logger.info(
            "OpenAI Completion request completed in {:10.4f}s".format(request_time))
        created_article = completion.choices[0].text
        app.logger.info(
            f"Received completion used {completion.usage.total_tokens} total tokens")
        return created_article
    except Exception as e:
        print(e)
        # app.logger.error(f"An Error Occurred in OpenAI: {e}")
        raise e


def concurrent_completions(prompts_and_tokens):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        created_articles = executor.map(get_completion, prompts_and_tokens)
        full_transformed_article = ""
        for article in created_articles:
            full_transformed_article += article
    return full_transformed_article


@app.route('/transform', methods=['POST'])
async def create():
    # Get data from the OpenAI API
    try:
        article = request.json['article']
        lexile = request.json['lexile']
        prompts_and_tokens = PromptEngine.get_prompts_and_tokens(
            lexile, article)
        full_transformed_article = concurrent_completions(prompts_and_tokens)
    except Exception as e:
        print(e)
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
            {"articleContent": full_transformed_article, "createdAt": datetime.utcnow().isoformat(), "promptId": prompt_result.key})

        map_ref = db.reference('/articleMap')
        map_result = map_ref.push(
            {"promptId": prompt_result.key, "createdId": created_result.key})
        firebase_time = time.perf_counter() - firebase_start
        app.logger.info(
            "Firebase Completion request completed in {:10.4f}s".format(firebase_time))

        # TODO: make a class for the return result
        return jsonify(created_result.get()), 200
    except Exception as e:
        print(f"An Error Occurred in Firebase: {e}")
        abort(500)
        return

@ app.route('/chat', methods=['POST'])
def chat():
    try:
        response = """
        Okay, I will send an email to absent students' parents with assignments in Google Classroom that were covered.
        //P// Powerschool: Find students who were absent today.... \n
        //P// Google Classroom: Look for assignments that were assigned today.... \n
        //P// Gmail: Draft an email to parents explaining the assignments that were covered today....\n
        """
        input = request.json['prompt']
        previous_context = request.json['previous_context']
        prompt = PromptTemplate(
            input_variables=["input"],
            template=PromptEngine.ta_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt)
        response = chain.run(input)
        return {"llmResponse": response}, 200

    except Exception as e:
        print(e)
        return {"llmResponse": "OpenAI server is down. Please try again."}, 200


@ app.route('/chat_response', methods=['POST'])
# This method is different than /chat because it uses a different prompt, one which takes in the existing workflow
# context and modifies the existing workflow
def chat_response():
    try:
        response = """
        Okay, I will send an email to absent students' parents with assignments in Google Classroom that were covered.
        //P// Powerschool: Find students who were absent today.... \n
        //P// Google Classroom: Look for assignments that were assigned today.... \n
        //P// Gmail: Draft an email to parents explaining the assignments that were covered today....\n
        """
        input = request.json['prompt']
        previous_context = request.json['previous_context']

        # We need to split out the workflow from the existing prompt.
        prompt = PromptTemplate(
            input_variables=["input", "workflow"],
            template=PromptEngine.response_ta_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt)
        response = chain.run(input=input, workflow=previous_context)
        return {"llmResponse": response}, 200

    except Exception as e:
        print(e)
        return {"llmResponse": "OpenAI server is down. Please try again."}, 200

@ app.route('/invoke_tool', methods=["POST"])
def invoke_tool():
    try:
        result = "HELLO DEMO RESPONSE"
        print(request.json)
        input = request.json['prompt']
        tool = request.json['tool']
        attachments = request.json['attachments']
        result = exampleCheck(tool, input)
        if result is None:
            result = ToolEngine.invokeTool(tool, input, attachments)
        return {"toolResponse": result}, 200
    
    except Exception as e:
        print(e)
        return {"llmResponse": "OpenAI server is down. Please try again."}, 200

port = int(os.environ.get('PORT', 8080))
if __name__ == '__main__':
    app.run(threaded=True, host='0.0.0.0', port=port, debug=True)

