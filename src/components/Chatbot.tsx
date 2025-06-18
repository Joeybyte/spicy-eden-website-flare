import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen: externalIsOpen, onOpenChange }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "🌶️ Hey there! I'm Spice Bot, your fiery food assistant! How can I help you find the perfect spicy dish today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [sessionId] = useState(() => crypto.randomUUID());
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Use external control if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = (open: boolean) => {
    if (onOpenChange) {
      onOpenChange(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  const quickReplies = [
    "What's your spiciest dish?",
    "Recommend mild spicy dishes", 
    "What are today's specials?",
    "Delivery information",
    "Nutritional information"
  ];

  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  const loadChatHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const loadedMessages = data.map(msg => ({
          id: msg.id,
          text: msg.message,
          isBot: msg.is_bot,
          timestamp: new Date(msg.created_at)
        }));
        setMessages(loadedMessages);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  };

  const saveMessage = async (message: string, isBot: boolean) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase
        .from('chat_messages')
        .insert({
          session_id: sessionId,
          user_id: user?.id || null,
          message,
          is_bot: isBot
        });
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Save user message
    await saveMessage(inputValue, false);

    // Get bot response
    setTimeout(async () => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: crypto.randomUUID(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      
      // Save bot message
      await saveMessage(botResponse, true);
      setIsLoading(false);
    }, 1000);

    setInputValue('');
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('spiciest') || lowerInput.includes('hottest')) {
      return "🔥🔥🔥 Our spiciest dishes are the Dragon's Breath Noodles and Fire Storm Ramen - both are 5/5 on the heat scale! Made with ghost peppers and Carolina Reapers. Are you brave enough to handle the heat? 😈";
    }
    
    if (lowerInput.includes('mild') || lowerInput.includes('not too spicy')) {
      return "🌶️ For mild heat lovers, I recommend our Hell's Kitchen Pizza (3/5 heat) or Blazing Beef Tacos (4/5 heat)! They have amazing flavor with manageable spice levels. Perfect for building up your heat tolerance! 🍕🌮";
    }
    
    if (lowerInput.includes('special') || lowerInput.includes('recommend')) {
      return "✨ Today's specials include our signature Volcano Curry Rice and the crowd-favorite Inferno Chicken Wings! Both are perfectly balanced with authentic spices. Which type of cuisine are you in the mood for? 🍛🍗";
    }
    
    if (lowerInput.includes('delivery') || lowerInput.includes('order')) {
      return "🚚 We deliver within 30-45 minutes! Free delivery for orders over RM25. Our delivery areas cover KL and Selangor. You can place your order right here on our website - just add items to your cart! 📱";
    }
    
    if (lowerInput.includes('nutrition') || lowerInput.includes('calories') || lowerInput.includes('healthy')) {
      return "📊 All our dishes show detailed nutritional info! Most range from 520-890 calories. We use fresh ingredients and authentic spices. Our Volcano Curry Rice has the lowest calories (580) while still packing serious flavor! 🥗";
    }

    if (lowerInput.includes('vegan') || lowerInput.includes('vegetarian')) {
      return "🌱 While our current menu focuses on meat dishes, we can modify some items! Our Volcano Curry Rice can be made vegetarian, and our spicy noodles work great with tofu. Would you like me to suggest some modifications? 🍜";
    }

    if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('expensive')) {
      return "💰 Our dishes range from RM22.90 to RM32.00. Best value is our Blazing Beef Tacos at RM22.90! Remember, orders over RM25 get free delivery. What's your budget range? 💵";
    }
    
    return "🌶️ That's a great question! I'm here to help you navigate our spicy menu. Feel free to ask about specific dishes, spice levels, ingredients, or anything else. What would you like to know more about? 🔥";
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
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
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                  <p className="text-sm">🌶️ Thinking...</p>
                </div>
              </div>
            )}

            {/* Quick Replies */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-gray-500 text-center">Quick questions:</p>
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start text-xs hover:bg-red-50"
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
                placeholder="Ask me about our spicy dishes..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
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
