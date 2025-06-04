
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface HeroProps {
  onCartClick: () => void;
  cartItemsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ onCartClick, cartItemsCount }) => {
  const scrollToFoodGrid = () => {
    const foodSection = document.getElementById('food-grid');
    if (foodSection) {
      foodSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderNow = () => {
    scrollToFoodGrid();
    // Small delay to let scroll finish, then open cart
    setTimeout(() => {
      onCartClick();
    }, 500);
  };

  return (
    <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-500 min-h-screen flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>
      
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        <div className="flex items-center space-x-2">
          <span className="text-3xl">🌶️</span>
          <h1 className="text-2xl font-bold text-white">Spicy Eden Kitchen</h1>
        </div>
        <Button 
          variant="outline" 
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 relative"
          onClick={onCartClick}
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          Cart
          {cartItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {cartItemsCount}
            </span>
          )}
        </Button>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <h2 className="text-6xl font-bold mb-6 leading-tight">
            Ignite Your Taste Buds with 
            <span className="text-yellow-300"> Fiery Flavors</span>
          </h2>
          <p className="text-xl mb-8 text-red-100 leading-relaxed">
            Spicy Eden Kitchen delivers bold, authentic spicy dishes that satisfy both heat seekers and flavor lovers. Experience the perfect balance of fire and taste.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg"
              onClick={scrollToFoodGrid}
              className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              🔥 Browse Food
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={handleOrderNow}
              className="border-2 border-white text-red-600 hover:bg-white hover:text-red-600 font-bold text-lg px-8 py-6 rounded-full transform hover:scale-105 transition-all duration-200 bg-white"
            >
              🚀 Order Now
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-6 text-red-600">
              <div className="text-center">
                <div className="text-6xl mb-4">🌶️🔥</div>
                <h3 className="text-2xl font-bold mb-2">Heat Level: LEGENDARY</h3>
                <p className="text-lg">Experience flavors that ignite your soul</p>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 bg-yellow-400 rounded-full p-3 text-2xl animate-bounce">
            🌶️
          </div>
          <div className="absolute -bottom-4 -right-4 bg-orange-400 rounded-full p-3 text-2xl animate-pulse">
            🔥
          </div>
        </div>
      </div>
    </div>
  );
};
