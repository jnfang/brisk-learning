import { invokeChat } from "./utils";

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

  inResponseMode = () => {
    if (!!this.stateRef && "messages" in this.stateRef && this.stateRef.messages.length > 0) {
      const messageArray  = this.stateRef
      for (const message of messageArray.messages) {
        if (message.type === "bot" && localStorage["lastBotMessage"].includes(message.message)) {
          // We need to check if localStorage matches one of the recent messages because we need to use
          // localStorage to grab the prompts
          return true;
        }
      }
    }
    return false;
  }

  invokeAutomation = async (input) => {
    const setChatBotState = (cleanedLlmResponse) => {
      const message = this.createChatBotMessage(cleanedLlmResponse);
      this.updateChatBotState([message]);
    }

    const previousContext = this.inResponseMode() ? localStorage["lastBotMessage"] : "";
    // Send lastBotMessage as previousContext to use for the chat_response
    invokeChat(input, previousContext, setChatBotState, {}, null);
  }

  updateChatBotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...message],
    }));
  }

}

export default ActionProvider;