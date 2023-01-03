import { invokeChatResponse } from "./utils";

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

 // TODO We don't have access to attachments here, so will need 
 // to use local storage or some other method to store them

 // exampleState is set to null because in invokeChatResponse because
 // this is only called on the second message
  invokeAutomation = async (input) => {
    const setChatBotState = (cleanedLlmResponse) => {
      const message = this.createChatBotMessage(cleanedLlmResponse);
      this.updateChatBotState([message]);
    }
    
    invokeChatResponse(input, "", setChatBotState, {}, null);
  }

  updateChatBotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...message],
    }));
  }

}

export default ActionProvider;