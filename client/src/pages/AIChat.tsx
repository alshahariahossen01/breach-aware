import React, { useState } from 'react';
import { MessageCircle, Send, Loader, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { aiService } from '../services/aiService';

interface AIChatProps {
  context?: {
    email?: string | null;
    breaches?: Array<any>;
    passwordExposed?: boolean;
  };
  onClose?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ context, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message.trim();
    setMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await aiService.processQuery(userMessage, context);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error: any) {
      toast.error(error.message || 'Failed to get AI response');
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What should I do if my email was breached?",
    "How do I create a strong password?",
    "Should I enable two-factor authentication?",
    "What is the risk level of my password?"
  ];

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-6 h-6 text-primary-600" />
            <h2 className="text-xl font-semibold">AI Security Assistant</h2>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="mb-4">Ask me anything about your security status or get personalized recommendations!</p>
              
              {context && (context.email || context.breaches?.length || context.passwordExposed) && (
                <div className="bg-primary-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-primary-800 mb-2">Your Security Context:</h3>
                  {context.email && <p className="text-sm text-primary-700">Email: {context.email}</p>}
                  {context.breaches?.length > 0 && (
                    <p className="text-sm text-primary-700">
                      Found in {context.breaches.length} breach(es)
                    </p>
                  )}
                  {context.passwordExposed && (
                    <p className="text-sm text-primary-700">Password exposed in breaches</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Quick questions:</p>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="block w-full text-left text-sm text-primary-600 hover:text-primary-800 hover:bg-primary-50 p-2 rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span className="text-gray-600">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about your security status..."
              className="flex-1 input-field"
              disabled={loading}
            />
            <button
              onClick={handleSendMessage}
              disabled={loading || !message.trim()}
              className="btn-primary flex items-center justify-center px-4"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
