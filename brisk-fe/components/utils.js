
// Returns the cleaned up LLM response that will be displayed in chat
export async function invokeChatResponse(input, previous_context, setStateCallback) {
    const chatEndpoint = "http://127.0.0.1:8080/chat";
    localStorage["lastBotMessage"] = null;
    const data = {
        prompt: input,
        previous_context: ""
    }
    const res = await fetch(chatEndpoint, {
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    const result = await res.json();
    var llmResponse = result.llmResponse;
    // Need to update this to use chatbot's save message method
    localStorage["lastBotMessage"] = llmResponse;
    var firstPromptIndex = llmResponse.indexOf("//P//");
    let cleanedLlmResponse;
    if (firstPromptIndex > -1) {
        cleanedLlmResponse = llmResponse.substring(0, firstPromptIndex);
    }else{
        cleanedLlmResponse = llmResponse;
    }
    setStateCallback(cleanedLlmResponse);
    return cleanedLlmResponse;
}

