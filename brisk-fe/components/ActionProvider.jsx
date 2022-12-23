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
      console.log(input);
      const data = {
        prompt: input,
        previous_context: ""
      }
      console.log(data);
      const res = await fetch(chat_endpoint, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      const result = await res.json();
      var llmResponse = result.llmResponse;
      console.log(llmResponse);

      
      // const message1 = this.createChatBotMessage("Querying who is absent today from Powerschool");
      // const message2 = this.createChatBotMessage("Alex Paulson, Eric Lau, and Malvika Rao are absent today.");
      // const message3 = this.createChatBotMessage("Exempting these students in Google Classroom...");
      // const message4 = this.createChatBotMessage("Complete.");
      const message = this.createChatBotMessage(llmResponse);
      console.log(this.stateRef)
      this.updateChatBotState([message]);
      console.log(this.stateRef)
  }

  updateChatBotState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, ...message],
    }));
    console.log("this is the state");
    console.log(this.state)
  }

}

export default ActionProvider;