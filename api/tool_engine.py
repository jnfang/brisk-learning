from langchain import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from prompt_engine import PromptEngine
import re
import concurrent.futures

class ToolEngine(object):

    @staticmethod
    def processGoogleClassroom(input, attachments):
        if "chat_context" in attachments:
            context = attachments["chat_context"]
        else:
            context = ""
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 
    
    @staticmethod
    def processYoutube(prompt, attachments):
        return
    
    @staticmethod
    def processGmail(input, attachments):
        if "chat_context" in attachments:
            context = attachments["chat_context"]
        else:
            context = ""
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.email_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response

    @staticmethod
    def processGoogleMeet(prompt, attachments):
        return

    @staticmethod
    def processGoogleCalendar(prompt, attachments):
        return

    @staticmethod
    def processGoogleDocs(prompt, attachments):
        return

    @staticmethod
    def processGoogleSlides(prompt, attachments):
        return

    @staticmethod
    def processGoogleSheets(prompt, attachments):
        return

    @staticmethod
    def processZoom(prompt, attachments):
        return

    @staticmethod
    def processClever(prompt, attachments):
        return

    @staticmethod
    def processRemind(prompt, attachments):
        return

    @staticmethod
    def processSchoology(prompt, attachments):
        if "chat_context" in attachments:
            context = attachments["chat_context"]
        else:
            context = ""
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": prompt, "context":context})
        return response 

    @staticmethod
    def processAries(prompt, attachments):
        if "chat_context" in attachments:
            context = attachments["chat_context"]
        else:
            context = ""
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": prompt, "context":context})
        return response 

    @staticmethod
    def processCanvas(prompt, attachments):
        if "chat_context" in attachments:
            context = attachments["chat_context"]
        else:
            context = ""
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": prompt, "context":context})
        return response 

    @staticmethod
    def processPowerSchool(prompt, attachments):
        if "chat_context" in attachments:
            context = attachments["chat_context"]
        else:
            context = ""
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 

    @staticmethod
    def processGoogleDrive(prompt, attachments):
        return

    @staticmethod
    def processWikipedia(prompt, attachments):
        return

    @staticmethod
    def processData(prompt, attachments):
        return

    @staticmethod
    def processCurriculum(prompt, attachments):
        return

    @staticmethod
    def get_completion(prompt_and_token):
        prompt, tokens_left = prompt_and_token
        print(prompt)
        print(tokens_left)
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
        else:
            return "You need to attach a website or text to convert it!"
        print(article)

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
        'remind': processRemind,
        'schoology': processSchoology,
        'aries': processAries,
        'canvas': processCanvas,
        'powerschool': processPowerSchool,
        'google drive': processGoogleDrive,
        'wikipedia': processWikipedia,
        'data': processData,
        'curriculum': processCurriculum,
        'lexile converter': processLexileConversion
    }

    @staticmethod
    def invokeTool(tool, prompt, attachments):
        # Get the right process method
        process_function = ToolEngine.tool_to_function[tool]
        tool_result = process_function(prompt, attachments)
        return tool_result
