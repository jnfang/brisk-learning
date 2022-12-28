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

  invokeAutomation = async (input) => {
    const setChatBotState = (cleanedLlmResponse) => {
      const message = this.createChatBotMessage(cleanedLlmResponse);
      this.updateChatBotState([message]);
    }
    invokeChatResponse(input, "context", setChatBotState);
  }

  updateChatBotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...message],
    }));
  }

}

export default ActionProvider;