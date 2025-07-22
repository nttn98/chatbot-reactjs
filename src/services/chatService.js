export async function fetchChatbotReply(message) {
    // Dummy API simulation
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Echo: ${message}`);
        }, 1000);
    });
}