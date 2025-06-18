
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface HeroProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onCartClick, cartItemsCount }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You've been successfully signed out.",
    });
  };

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-br from-red-600 to-orange-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 text-8xl animate-bounce">🌶️</div>
        <div className="absolute top-40 right-32 text-6xl animate-pulse">🔥</div>
        <div className="absolute bottom-32 left-1/4 text-7xl animate-bounce delay-1000">🥵</div>
        <div className="absolute bottom-20 right-20 text-5xl animate-pulse delay-500">🌶️</div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🌶️</span>
          <h1 className="text-2xl font-bold">Spicy Eden</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => navigate('/profile')}
              >
                <User className="w-5 h-5 mr-2" />
                Profile
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={handleSignOut}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={() => navigate('/auth')}
            >
              <User className="w-5 h-5 mr-2" />
              Sign In
            </Button>
          )}
          
          <Button
            variant="ghost"
            className="relative text-white hover:bg-white/20"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-black min-w-[1.5rem] h-6 flex items-center justify-center text-xs font-bold">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
            🔥 SPICY EDEN 🔥
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 font-semibold">
            Where Every Bite Burns with Flavor!
          </p>
          
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Experience the ultimate spicy food journey with authentic dishes that will set your taste buds on fire. 
            From mild heat to volcanic intensity - we've got the perfect spice level for everyone!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-yellow-500 text-black text-lg px-4 py-2 animate-bounce">
              🌶️ Authentic Spices
            </Badge>
            <Badge className="bg-orange-500 text-white text-lg px-4 py-2 animate-bounce delay-100">
              🚚 Fast Delivery
            </Badge>
            <Badge className="bg-red-500 text-white text-lg px-4 py-2 animate-bounce delay-200">
              🔥 Fresh & Hot
            </Badge>
          </div>
          
          <div className="space-y-4">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 text-xl px-8 py-4 font-bold transform hover:scale-105 transition-all duration-200 shadow-2xl"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              🌶️ Order Now & Feel the Heat!
            </Button>
            
            <p className="text-sm opacity-75">
              ⚡ Limited Time: Free delivery on orders over RM25
            </p>
          </div>
        </div>
      </div>

      {/* Floating Spice Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};
