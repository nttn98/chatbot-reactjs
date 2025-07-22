const restFullChatService = {
    async fetchChatbotReplyStream(message, onChunk, signal) {
        try {
            const response = await fetch("http://127.0.0.1:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: message }),
                signal, // quan trọng: truyền signal để hỗ trợ abort
            });

            if (!response.ok || !response.body) {
                throw new Error("Network response failed");
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let botMessage = "";

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                botMessage += chunk;
                if (onChunk) onChunk(chunk, botMessage);
            }

            return botMessage;
        } catch (error) {
            console.error("Streaming error:", error);
            throw error;
        }
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
