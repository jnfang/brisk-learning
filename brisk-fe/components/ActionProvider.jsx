// ActionProvider starter code
class ActionProvider {
  constructor(
   createChatBotMessage,
   setStateFunc,
   createClientMessage,
   stateRef,
   createCustomMessage,
   invokeAutomtion,
   ...rest
 ) {
   this.createChatBotMessage = createChatBotMessage;
   this.setState = setStateFunc;
   this.createClientMessage = createClientMessage;
   this.stateRef = stateRef;
   this.createCustomMessage = createCustomMessage;
   this.invokeAutomtion = invokeAutomtion;
 }

  invokeAutomation = async (input) => {
      const chat_endpoint = "http://127.0.0.1:8080/chat";
      localStorage["lastBotMessage"] = null;
      const data = {
        prompt: input,
        previous_context: ""
      }
      const res = await fetch(chat_endpoint, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });


      const result = await res.json();
      var llmResponse = result.llmResponse;

      // Let's try to use local storage to share state with CurrentWorkflow.jsx
      localStorage["lastBotMessage"] = llmResponse;
      var firstPromptIndex = llmResponse.indexOf("//P//");
      console.log()
      let cleanedLlmResponse;
      if (firstPromptIndex > -1) {
        cleanedLlmResponse = llmResponse.substring(0, firstPromptIndex);
      }else{
        cleanedLlmResponse = llmResponse;
      }
      const message = this.createChatBotMessage(cleanedLlmResponse);
      this.updateChatBotState([message]);

  }

  updateChatBotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...message],
    }));
  }

}

export default ActionProvider;