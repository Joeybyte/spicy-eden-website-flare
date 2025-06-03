
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  total: number;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, total }) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = () => {
    // Here you would integrate with payment processing
    alert('Order placed successfully! 🎉');
    onClose();
    setIsCheckout(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b bg-red-600 text-white">
          <h2 className="text-2xl font-bold">
            {isCheckout ? '🔥 Checkout' : '🛒 Your Cart'}
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[60vh] p-6">
          {!isCheckout ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-red-600 font-bold">RM {item.price.toFixed(2)} each</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="font-bold text-lg min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="font-bold text-lg">
                          RM {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={customerInfo.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="mt-1"
                />
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Badge variant="outline" className="mr-2">💳 Credit/Debit Card</Badge>
                    <Badge variant="outline" className="mr-2">🅿️ PayPal</Badge>
                    <Badge variant="outline" className="mr-2">💰 Cash on Delivery</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold text-red-600">
                RM {total.toFixed(2)}
              </span>
            </div>
            
            {!isCheckout ? (
              <Button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg rounded-full"
              >
                🚀 Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  onClick={() => setIsCheckout(false)}
                  variant="outline"
                  className="w-full"
                >
                  ← Back to Cart
                </Button>
                <Button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 text-lg rounded-full"
                >
                  🎉 Place Order
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
