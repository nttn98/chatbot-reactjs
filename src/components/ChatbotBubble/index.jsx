import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import bot from "../../images/bot.svg";

function ChatbotBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBodyRef = useRef(null);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: message }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: `Echo: ${message}` },
      ]);
    }, 700);
    setMessage("");
  };

  useEffect(() => {
    chatBodyRef.current?.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const BotImage = ({ size = 32 }) => (
    <img
      src={bot}
      alt="Bot Avatar"
      className="bot-avatar-img"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: "2px solid #fff",
        objectFit: "cover",
      }}
    />
  );

  return (
    <div className="chatbot-container position-fixed bottom-0 end-0 m-4">
      {isOpen ? (
        <div className="chatbot-card card shadow-lg rounded-4 d-flex flex-column animate__animated animate__fadeInUp">
          <div className="card-header d-flex justify-content-between align-items-center rounded-top-4 chatbot-header">
            <div className="d-flex align-items-center">
              <BotImage />
              <span className="fw-bold text-white fs-5 ms-2">AI Assistant</span>
            </div>
            <button
              className="btn-close btn-close-white"
              onClick={toggleChat}
            ></button>
          </div>

          <div ref={chatBodyRef} className="chatbot-body flex-grow-1">
            {messages.length === 0 ? (
              <div className="text-center text-muted initial-message p-4">
                <BotImage size={50} />
                <h5 className="mt-3 mb-2">Hello there!</h5>
                <p>How can I assist you today?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`d-flex ${
                    msg.from === "user"
                      ? "justify-content-end"
                      : "justify-content-start"
                  }`}
                >
                  {msg.from === "bot" && (
                    <div className="message-bot-avatar-wrapper me-2 align-self-end">
                      <BotImage size={28} />
                    </div>
                  )}
                  <div
                    className={`message-bubble ${
                      msg.from === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="card-footer p-3 bg-white border-top-0">
            <div className="input-group chatbot-input-group">
              <input
                type="text"
                className="form-control chatbot-input"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                className="btn chatbot-send-btn"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <i className="bi bi-send-fill fs-4"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="chatbot-toggle-button animate__animated animate__pulse animate__infinite"
          onClick={toggleChat}
        >
          <img src={bot} alt="Chatbot" style={{ width: 36, height: 36 }} />
        </button>
      )}
    </div>
  );
}

export default ChatbotBubble;
