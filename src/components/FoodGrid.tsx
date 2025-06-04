import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface FoodItem {
  id: number;
  name: string;
  description: string;
  price: number;
  calories: number;
  spiceLevel: number;
  image: string;
  category: string;
}

interface FoodGridProps {
  onAddToCart: (item: FoodItem) => void;
}

const spicyFoods: FoodItem[] = [
  {
    id: 1,
    name: "Dragon's Breath Noodles",
    description: "Fiery noodles with ghost pepper sauce, tender beef, and fresh herbs",
    price: 28.90,
    calories: 650,
    spiceLevel: 5,
    image: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400&h=300&fit=crop",
    category: "Noodles"
  },
  {
    id: 2,
    name: "Inferno Chicken Wings",
    description: "Crispy wings glazed with Carolina Reaper sauce and honey",
    price: 24.50,
    calories: 720,
    spiceLevel: 4,
    image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400&h=300&fit=crop",
    category: "Chicken"
  },
  {
    id: 3,
    name: "Volcano Curry Rice",
    description: "Aromatic curry with scotch bonnet peppers, coconut milk, and jasmine rice",
    price: 26.90,
    calories: 580,
    spiceLevel: 4,
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop",
    category: "Rice"
  },
  {
    id: 4,
    name: "Hell's Kitchen Pizza",
    description: "Wood-fired pizza with jalapeños, pepperoni, and sriracha drizzle",
    price: 32.00,
    calories: 890,
    spiceLevel: 3,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop",
    category: "Pizza"
  },
  {
    id: 5,
    name: "Blazing Beef Tacos",
    description: "Spiced beef with habanero salsa, avocado, and lime",
    price: 22.90,
    calories: 520,
    spiceLevel: 4,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    category: "Mexican"
  },
  {
    id: 6,
    name: "Fire Storm Ramen",
    description: "Rich tonkotsu broth with chili oil, soft egg, and chashu pork",
    price: 29.50,
    calories: 680,
    spiceLevel: 5,
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=400&h=300&fit=crop",
    category: "Ramen"
  }
];

const getSpiceEmoji = (level: number) => {
  const emojis = ['🌶️', '🌶️🌶️', '🌶️🌶️🌶️', '🔥🌶️🔥', '🔥🔥🔥'];
  return emojis[level - 1] || '🌶️';
};

export const FoodGrid: React.FC<FoodGridProps> = ({ onAddToCart }) => {
  const { toast } = useToast();

  const handleAddToCart = (item: FoodItem) => {
    onAddToCart(item);
    toast({
      title: "Added to Cart! 🛒",
      description: `${item.name} has been added to your cart`,
    });
  };

  return (
    <section id="food-grid" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Our <span className="text-red-600">Fiery</span> Menu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Carefully crafted dishes that bring the perfect balance of heat and flavor to your table
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {spicyFoods.map((food) => (
            <Card key={food.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden bg-white">
              <div className="relative overflow-hidden">
                <img 
                  src={food.image} 
                  alt={food.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-red-600 text-white font-bold">
                    {getSpiceEmoji(food.spiceLevel)}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-800">
                    {food.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                  {food.name}
                </CardTitle>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {food.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-2xl font-bold text-red-600">
                    RM {food.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {food.calories} cal
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="text-xs text-gray-600 mb-1">Nutritional Info</div>
                  <div className="flex justify-between text-sm">
                    <span>Calories: {food.calories}</span>
                    <span>Spice Level: {food.spiceLevel}/5</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button 
                  onClick={() => handleAddToCart(food)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full transform hover:scale-105 transition-all duration-200"
                >
                  🛒 Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
