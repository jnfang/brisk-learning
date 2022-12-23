class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }
  
    parse(message) {
        const lowercase = message.toLowerCase();
        console.log(this.actionProvider.invokeDataPull)
        this.actionProvider.invokeAutomation(lowercase);    }
}

export default MessageParser;
