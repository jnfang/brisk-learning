class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        this.state = state;
    }
  
    parse(message) {
        const lowercase = message.toLowerCase();
        this.actionProvider.invokeAutomation(lowercase);    }
}

export default MessageParser;
