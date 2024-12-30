import "../../assets/css/Chatbot.css";
import React, { useEffect, useRef, useState } from "react";
import bot from "../../assets/images/bot.png";
import axios from "axios";

function Chatbot() {
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [popQuestions, setPopQuestions] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://localhost:7011/api/Chatbot");
      setQuestions(result.data);
    };
    fetchData();
  }, []);

  const [popularQuestions, setPopularQuestions] = useState([
    {
      question: "Can I cancel my order?",
      response:
        "You can cancel your order within 24 hours of placing it. Contact our customer support for assistance.",
    },
    {
      question: " How long does shipping take?",
      response:
        "Shipping times vary depending on your location and the shipping method chosen. Typically, it takes 3-5 business days.",
    },
    {
      question: "What payment methods do you accept?",
      response:
        "We accept major credit cards, debit cards, and PayPal. Also we offer Cash On Delivery method.",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isBotTyping]);

  useEffect(() => {
    setConversation([
      ...conversation,
      {
        type: "bot",
        message: "Hello! How can I help you today?",
      },
    ]);
  }, []);

  const getBotResponse = (message) => {
    let response = "";
    questions.forEach((item) => {
      if (message.toLowerCase().includes((item.question).toLowerCase())) {
        response = item.response;  
      }
      else response = "I am sorry, I do not understand your question!"
    });
    return response;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUserMessage = {
      type: "user",
      message: userMessage,
      className: "new-message",
    };

    setUserMessage("");

    setConversation([
      ...conversation,
      {
        type: "user",
        message: newUserMessage,
      },
    ]);
    setTimeout(() => {
      setIsBotTyping(true);
    }, 500);
    setConversation([...conversation, newUserMessage]);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      const newBotMessage = {
        type: "bot",
        message: botResponse,
      };

      setConversation([...conversation, newUserMessage, newBotMessage]);
      setIsBotTyping(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handlePopularQuestion = (question, response, index) => {
    if (popularQuestions.length === 1) {
      setPopQuestions(false);
    }
    popularQuestions.splice(index, 1);
    setPopularQuestions([...popularQuestions]);

    popularQuestions.pop();

    const newUserMessage = {
      type: "user",
      message: question,
      className: "new-message",
    };

    setConversation([...conversation, newUserMessage]);

    setTimeout(() => {
      setIsBotTyping(true);
    }, 500);

    setTimeout(() => {
      const newBotMessage = {
        type: "bot",
        message: response,
      };

      setConversation([...conversation, newUserMessage, newBotMessage]);
      setIsBotTyping(false);
      setUserMessage("");
    }, 1500);
  };
  return (
    <div>
      <button
        className={`chat-button ${isChatbotVisible ? "open" : ""}`}
        onClick={() => setIsChatbotVisible(!isChatbotVisible)}
      >
       
          <img src={bot} alt="bot" />
      </button>

      <div id="chatbot" className={isChatbotVisible ? "open" : ""}>
        <div className="chatbot-header">
          <h2>  Chat Assistant</h2>
          <button
            className="close-button"
            onClick={() => setIsChatbotVisible(false)}
          >
            Close
          </button>
        </div>
        <div className="conversation-background">
        <div id="chatbot-conversation">
          <div className="chat-messages">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`message-bubble ${message.type} ${message.className}`}
              >
                <p>{message.message}</p>
              </div>
            ))}
            {isBotTyping && (
              <div className="message-bubble bot">
                <p>Typing...</p>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
          <div className={`popular-questions ${popQuestions ? "" : "close"} `}>
          {popularQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => {
                handlePopularQuestion(
                  question.question,
                  question.response,
                  index
                );
              }}
            >
              {question.question}
            </button>
          ))}
        </div>
        </div>

        
        </div>


        <form onSubmit={handleSubmit}>
          <input
            id="chatbot-message"
            type="text"
            value={userMessage}
            onChange={handleChange}
            placeholder="Type your message here"
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
