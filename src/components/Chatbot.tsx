
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "🌶️ Hey there! I'm Spice Bot, your fiery food assistant! How can I help you find the perfect spicy dish today?",
      isBot: true
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickReplies = [
    "Recommend mild spicy dishes",
    "What's your spiciest item?",
    "Help with my order",
    "Delivery information",
    "Nutritional facts"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: botResponse,
        isBot: true
      }]);
    }, 1000);

    setInputValue('');
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('mild') || lowerInput.includes('not too spicy')) {
      return "🌶️ For mild heat, I recommend our Hell's Kitchen Pizza or Blazing Beef Tacos! They have great flavor with manageable spice levels. Perfect for building up your heat tolerance! 🍕🌮";
    }
    
    if (lowerInput.includes('spiciest') || lowerInput.includes('hottest')) {
      return "🔥🔥🔥 Our spiciest dish is the Dragon's Breath Noodles and Fire Storm Ramen - both are 5/5 on the heat scale! Made with ghost peppers and Carolina Reapers. Are you brave enough? 😈";
    }
    
    if (lowerInput.includes('order') || lowerInput.includes('help')) {
      return "📞 I'm here to help! You can modify quantities in your cart, track your order status, or contact our support team. What specific help do you need with your order?";
    }
    
    if (lowerInput.includes('delivery')) {
      return "🚚 We deliver within 30-45 minutes! Free delivery for orders over RM25. Our delivery areas cover all of KL and Selangor. Want to check if we deliver to your area?";
    }
    
    if (lowerInput.includes('nutrition') || lowerInput.includes('calories')) {
      return "📊 All our dishes show calorie counts and nutritional info! We believe in transparency. Most dishes range from 520-890 calories. Any specific dietary concerns I can help with?";
    }
    
    return "🌶️ That's a great question! Our speciality is balancing incredible flavor with the perfect amount of heat. Would you like me to recommend dishes based on your spice tolerance, or do you have other questions about our menu?";
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 hover:bg-red-700 text-white rounded-full w-16 h-16 shadow-2xl transform hover:scale-110 transition-all duration-200 z-40"
      >
        <span className="text-2xl">🌶️</span>
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[32rem] bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Header */}
          <div className="bg-red-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">🌶️ Spice Bot</h3>
              <p className="text-red-100 text-sm">Your fiery food assistant</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs"
                    onClick={() => handleQuickReply(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about our spicy food..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
