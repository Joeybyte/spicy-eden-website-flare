
import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { FoodGrid } from '../components/FoodGrid';
import { Cart } from '../components/Cart';
import { Chatbot } from '../components/Chatbot';
import { Footer } from '../components/Footer';
import { SubscriptionSection } from '../components/SubscriptionSection';

const Index = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <Hero onCartClick={() => setIsCartOpen(true)} cartItemsCount={cartItems.length} />
      <FoodGrid onAddToCart={addToCart} />
      <SubscriptionSection />
      <Footer />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        total={cartTotal}
      />
      
      <Chatbot />
    </div>
  );
};

export default Index;
