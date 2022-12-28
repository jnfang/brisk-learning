from langchain import OpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from prompt_engine import PromptEngine


class ToolEngine(object):

    @staticmethod
    def processGoogleClassroom(input, context):
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 
    
    @staticmethod
    def processYoutube(prompt, context):
        return
    
    @staticmethod
    def processGmail(input, context):
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.email_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response

    @staticmethod
    def processGoogleMeet(prompt, context):
        return

    @staticmethod
    def processGoogleCalendar(prompt, context):
        return

    @staticmethod
    def processGoogleDocs(prompt, context):
        return

    @staticmethod
    def processGoogleSlides(prompt, context):
        return

    @staticmethod
    def processGoogleSheets(prompt, context):
        return

    @staticmethod
    def processZoom(prompt, context):
        return

    @staticmethod
    def processClever(prompt, context):
        return

    @staticmethod
    def processRemind(prompt, context):
        return

    @staticmethod
    def processSchoology(prompt, context):
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 

    @staticmethod
    def processAries(prompt, context):
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 

    @staticmethod
    def processCanvas(prompt, context):
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.lms_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 

    @staticmethod
    def processPowerSchool(prompt, context):
        prompt_template = PromptTemplate(
            input_variables=["input", "context"],
            template=PromptEngine.sis_prompt()
        )
        llm = OpenAI(temperature=0.0)
        chain = LLMChain(llm=llm, prompt=prompt_template)
        response = chain.run({"input": input, "context":context})
        return response 

    @staticmethod
    def processGoogleDrive(prompt, context):
        return

    @staticmethod
    def processWikipedia(prompt, context):
        return

    @staticmethod
    def processData(prompt, context):
        return

    @staticmethod
    def processCurriculum(prompt, context):
        return

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
        'curriculum': processCurriculum
    }

    @staticmethod
    def invokeTool(tool, prompt, context):
        # Get the right process method
        process_function = ToolEngine.tool_to_function[tool]
        tool_result = process_function(prompt, context)
        return tool_result
