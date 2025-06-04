
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  benefits: string[];
  buttonText: string;
  buttonColor: string;
  popular?: boolean;
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Plan',
    price: 0,
    duration: 'forever',
    description: 'Perfect for trying out our spicy delights',
    benefits: [
      'Browse full menu',
      'Standard delivery (3-5 days)',
      'Basic customer support',
      'Access to weekly promotions',
      'Recipe suggestions'
    ],
    buttonText: 'Get Started Free',
    buttonColor: 'bg-gray-600 hover:bg-gray-700'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 39,
    duration: 'month',
    badge: '🏷️ MOST POPULAR',
    badgeColor: 'bg-yellow-400 text-red-600',
    description: 'The perfect balance of heat and value',
    benefits: [
      '4 Exclusive dishes monthly',
      'Free delivery on all orders',
      '20% discount on extra orders',
      'Priority customer support',
      'Spice level customization',
      'Pause or cancel anytime',
      'Monthly spice blend samples',
      'Early access to new dishes'
    ],
    buttonText: '🚀 Subscribe Now',
    buttonColor: 'bg-red-600 hover:bg-red-700',
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro Spice Master',
    price: 79,
    duration: 'month',
    badge: '🔥 ULTIMATE',
    badgeColor: 'bg-orange-500 text-white',
    description: 'For true spice enthusiasts and food adventurers',
    benefits: [
      '8 Exclusive dishes monthly',
      'Free same-day delivery',
      '30% discount on extra orders',
      'VIP customer support (24/7)',
      'Custom spice level creation',
      'Monthly chef consultation call',
      'Exclusive spice blend collection',
      'Early access to limited editions',
      'Free cooking masterclass access',
      'Personalized meal recommendations',
      'Complimentary spice grinder kit'
    ],
    buttonText: '👑 Go Pro',
    buttonColor: 'bg-orange-600 hover:bg-orange-700'
  }
];

export const SubscriptionSection: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubscribe = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan.id);
    
    if (plan.id === 'free') {
      toast({
        title: "Welcome to Free Plan! 🎉",
        description: "You can now browse our menu and place orders with standard delivery.",
      });
    } else {
      toast({
        title: `${plan.name} Selected! 🌶️`,
        description: `You've selected the ${plan.name} for RM${plan.price}/${plan.duration}. Redirecting to payment...`,
      });
    }
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-red-600 to-orange-600">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            🔥 Choose Your Spice Level
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto">
            From casual heat lovers to extreme spice masters, we have the perfect plan for your fiery food journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-2xl ${
                plan.popular 
                  ? 'bg-white/15 backdrop-blur-sm border-yellow-400 border-2 scale-105' 
                  : 'bg-white/10 backdrop-blur-sm border-white/20'
              } ${selectedPlan === plan.id ? 'ring-4 ring-yellow-300' : ''}`}
            >
              {plan.badge && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`${plan.badgeColor} font-bold px-4 py-2 text-sm`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6 pt-12">
                <div className="text-4xl mb-4">
                  {plan.id === 'free' && '🆓'}
                  {plan.id === 'premium' && '🌶️🔥🌶️'}
                  {plan.id === 'pro' && '👑🔥👑'}
                </div>
                
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-yellow-300">
                    {plan.price === 0 ? 'FREE' : `RM${plan.price}`}
                    {plan.price > 0 && (
                      <span className="text-lg text-red-100">/{plan.duration}</span>
                    )}
                  </div>
                </div>
                
                <p className="text-red-100 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="text-white space-y-4 px-6 pb-8">
                <div className="space-y-3">
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-yellow-300 text-lg flex-shrink-0 mt-0.5">✅</span>
                      <div className="text-sm text-red-100 leading-relaxed">
                        {benefit}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6">
                  <Button 
                    onClick={() => handleSubscribe(plan)}
                    size="lg"
                    className={`w-full ${plan.buttonColor} text-white font-bold text-lg px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg`}
                  >
                    {plan.buttonText}
                  </Button>
                  
                  {plan.id !== 'free' && (
                    <p className="text-red-100 text-xs mt-3 text-center">
                      Cancel anytime • No hidden fees • 7-day money-back guarantee
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-red-100 text-lg mb-4">
            🔥 All plans include our signature spice guarantee and satisfaction promise
          </p>
          <div className="flex justify-center space-x-8 text-sm text-red-200">
            <span>✅ No setup fees</span>
            <span>✅ Secure payments</span>
            <span>✅ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
};
