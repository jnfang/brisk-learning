from langchain import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from prompt_engine import PromptEngine
import re
import concurrent.futures

from langchain.agents import load_tools
from langchain.agents import initialize_agent
from langchain.llms import OpenAI

class ToolEngine(object):

    @staticmethod
    def generate_context(attachments):
        context = ""
        if "chat_context" in attachments:
            context += "\nHere is the original request from the user: " + attachments["chat_context"]
        if "toolContext" in attachments:
            context += "This context may be helpful:" + attachments["toolContext"]
        return context

    @staticmethod
    def processGoogleClassroom(input, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=input, context=context)
        return response 
    
    @staticmethod
    def processYoutube(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 
    
    @staticmethod
    def processGmail(input, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.email_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=input, context=context)
        return response

    @staticmethod
    def processGoogleMeet(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processGoogleCalendar(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processGoogleDocs(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processGoogleSlides(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processGoogleSheets(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processZoom(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processClever(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processRemind(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processSchoology(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processAries(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processCanvas(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processPowerSchool(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processGoogleDrive(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processWikipedia(prompt, attachments):
        llm = OpenAI(temperature=0)
        tools = load_tools(["serpapi"], llm=llm)
        agent = initialize_agent(tools, llm, agent="zero-shot-react-description", verbose=True)
        response = agent.run(prompt)
        # import requests
        # language_code = 'en'
        # search_query = 'solar system'
        # number_of_results = 1
        # headers = {
        # # 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        # 'User-Agent': 'YOUR_APP_NAME (YOUR_EMAIL_OR_CONTACT_PAGE)'
        # }

        # base_url = 'https://api.wikimedia.org/core/v1/wikipedia/'
        # endpoint = '/search/page'
        # url = base_url + language_code + endpoint
        # parameters = {'q': search_query, 'limit': number_of_results}
        # response = requests.get(url, headers=headers, params=parameters)
        # print(response)
        return response

    @staticmethod
    def processData(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    @staticmethod
    def processCurriculum(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response 

    def processMonitor(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response
    
    def processFeedback(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response

    def processWritingIntegrity(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response
    
    def processLessonPlanner(prompt, attachments):
        context = ToolEngine.generate_context(attachments)
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.i_can_do_it_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run(input=prompt, context=context)
        return response
    
    @staticmethod
    def get_completion(prompt_and_token):
        prompt, tokens_left = prompt_and_token
        try:
            llm = OpenAI(temperature=0.0, max_tokens=tokens_left)
            created_article = llm(prompt)
            return created_article
        except Exception as e:
            print(e)
            raise e

    @staticmethod
    def concurrent_completions(prompts_and_tokens):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            print(type(prompts_and_tokens))
            created_articles = executor.map(ToolEngine.get_completion, prompts_and_tokens)
            full_transformed_article = ""
            for article in created_articles:
                full_transformed_article += article
        return full_transformed_article

    @staticmethod
    def processLexileConversion(prompt, attachments):
        # Attachments is a dictionary of values
        # Check if attachments has a text field
        if "text" in attachments:
            article = attachments["text"]
        elif "link" in attachments:
            return "This functionality is coming soon!"
        else:
            return "You need to attach a website or text to convert it!"

        def parseLlmResponse(llm_response):
            print(llm_response)
            result = re.search(r'\[(\d+)\]', llm_response)
            if result:
                # Return the number if found
                print(str(int(result.group(1))))
                return str(int(result.group(1)))
            else:
                return None
    
        print('right before prompt template')
        prompt_template = PromptTemplate(
            input_variables=["input"],
            template=PromptEngine.parse_lexile_prompt()
        )
        print('initializing llm')

        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        lexile = parseLlmResponse(chain.run({"input": prompt}))
        print(lexile)
        if lexile is None:
            return "You didn't provide enough information to infer a lexile level"

        prompts_and_tokens = PromptEngine.get_prompts_and_tokens(
            lexile, article)
        full_transformed_article = ToolEngine.concurrent_completions(prompts_and_tokens)
        return full_transformed_article

    tool_to_function = {
        'google classroom': processGoogleClassroom,
        'youtube': processYoutube,
        'gmail': processGmail,
        'google meet': processGoogleMeet,
        'google calendar': processGoogleCalendar,
        'google docs': processGoogleDocs,
        'google slides': processGoogleSlides,
        'google sheets': processGoogleSheets,
        'zoom': processZoom,
        'clever': processClever,
        'remind': processGmail,
        'schoology': processSchoology,
        'aries': processAries,
        'canvas': processCanvas,
        'powerschool': processPowerSchool,
        'google drive': processGoogleDrive,
        'wikipedia': processWikipedia,
        'data': processData,
        'curriculum': processCurriculum,
        'lexile converter': processLexileConversion,
        'monitor': processMonitor,
        'feedback': processFeedback,
        'writing integrity': processWritingIntegrity,
        'lesson planner': processLessonPlanner
    }

    @staticmethod
    def invokeTool(tool, prompt, attachments):
        # Get the right process method
        process_function = ToolEngine.tool_to_function[tool]
        tool_result = process_function(prompt, attachments)
        return tool_result
