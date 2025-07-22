const restFullChatService = {
    async fetchChatbotReply(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Echo from services: ${message}`);
            }, 1000);
        });
    },

    async getChatHistory() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { from: "bot", text: "Welcome back!" },
                    { from: "bot", text: "How can I help you today?" },
                ]);
            }, 500);
        });
    },

    async sendFeedback(feedback) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Feedback received: ${feedback}`);
            }, 700);
        });
    }
};

export default restFullChatService;
