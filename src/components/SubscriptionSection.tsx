
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const SubscriptionSection: React.FC = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-red-600 to-orange-600">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            🔥 Spicy Fix Plan
          </h2>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Never run out of heat! Get exclusive spicy dishes delivered to your doorstep every month.
          </p>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300">
          <CardHeader className="text-center pb-8">
            <div className="text-6xl mb-4">🌶️🔥🌶️</div>
            <CardTitle className="text-3xl font-bold text-white mb-2">
              Monthly Spice Subscription
            </CardTitle>
            <div className="text-5xl font-bold text-yellow-300 mb-2">
              RM39<span className="text-xl text-red-100">/month</span>
            </div>
            <Badge className="bg-yellow-400 text-red-600 font-bold px-4 py-2 text-lg">
              🏷️ BEST VALUE
            </Badge>
          </CardHeader>

          <CardContent className="text-white space-y-6">
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">✅</span>
                  <div>
                    <h4 className="font-bold">4 Exclusive Dishes Monthly</h4>
                    <p className="text-red-100 text-sm">Curated spicy meals you won't find elsewhere</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">✅</span>
                  <div>
                    <h4 className="font-bold">Free Delivery</h4>
                    <p className="text-red-100 text-sm">No delivery charges, ever</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">✅</span>
                  <div>
                    <h4 className="font-bold">20% Discount on Extra Orders</h4>
                    <p className="text-red-100 text-sm">Save more when you order additional items</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">✅</span>
                  <div>
                    <h4 className="font-bold">Pause or Cancel Anytime</h4>
                    <p className="text-red-100 text-sm">Complete flexibility, no commitments</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">✅</span>
                  <div>
                    <h4 className="font-bold">Spice Level Customization</h4>
                    <p className="text-red-100 text-sm">Tell us your heat preference</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-yellow-300 text-xl">✅</span>
                  <div>
                    <h4 className="font-bold">Priority Customer Support</h4>
                    <p className="text-red-100 text-sm">Get help faster as a subscriber</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                size="lg"
                className="bg-yellow-400 hover:bg-yellow-500 text-red-600 font-bold text-xl px-12 py-6 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                🚀 Subscribe Now
              </Button>
              <p className="text-red-100 text-sm mt-4">
                Start your spicy journey today • Cancel anytime • No hidden fees
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
