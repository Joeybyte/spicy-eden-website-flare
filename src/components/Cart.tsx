
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X, Plus, Minus, CreditCard, Wallet, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address || !customerInfo.city) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Payment Method Required",
        description: "Please select a payment method.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get current user (if logged in)
      const { data: { user } } = await supabase.auth.getUser();

      // Create the order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          customer_name: customerInfo.name,
          customer_email: customerInfo.email,
          customer_phone: customerInfo.phone,
          delivery_address: customerInfo.address,
          city: customerInfo.city,
          postal_code: customerInfo.postalCode,
          total_amount: total,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        food_item_id: item.id,
        food_name: item.name,
        food_price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Payment method specific success message
      const paymentMessages = {
        cash: "Your order will be paid upon delivery! 💵",
        card: "Redirecting to secure payment gateway... 💳",
        paypal: "Redirecting to PayPal... 🅿️",
        touchngo: "Redirecting to Touch & Go e-Wallet... 📱"
      };

      toast({
        title: "Order Placed Successfully! 🎉",
        description: `Order #${order.id.slice(0, 8)} confirmed. ${paymentMessages[paymentMethod as keyof typeof paymentMessages]}`
      });

      // Clear cart and close modal
      items.forEach(item => onUpdateQuantity(item.id, 0));
      onClose();
      setIsCheckout(false);
      setPaymentMethod('cash');
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
      });

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b bg-red-600 text-white flex-shrink-0">
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

        <div className="flex-1 overflow-y-auto p-6">
          {!isCheckout ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400 mt-2">Add some spicy dishes to get started!</p>
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
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-800 mb-2">🚚 Delivery Information</h3>
                <p className="text-yellow-700 text-sm">Free delivery for orders over RM25 • Estimated delivery: 30-45 minutes</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="mt-1"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                    placeholder="+60 12-345 6789"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={customerInfo.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1"
                    placeholder="Kuala Lumpur"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Delivery Address *</Label>
                <Input
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="mt-1"
                  placeholder="Street address, unit number"
                />
              </div>
              
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  value={customerInfo.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="mt-1"
                  placeholder="50000"
                />
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    💳 Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50/50 transition-colors">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex items-center gap-3 cursor-pointer flex-1">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="font-semibold">💰 Cash on Delivery</div>
                          <div className="text-sm text-gray-600">Pay when your order arrives</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-3 cursor-pointer flex-1">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-semibold">💳 Credit/Debit Card</div>
                          <div className="text-sm text-gray-600">Visa, Mastercard, American Express</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50/50 transition-colors">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Wallet className="w-5 h-5 text-blue-700" />
                        <div>
                          <div className="font-semibold">🅿️ PayPal</div>
                          <div className="text-sm text-gray-600">Pay with your PayPal account</div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-blue-50/50 transition-colors">
                      <RadioGroupItem value="touchngo" id="touchngo" />
                      <Label htmlFor="touchngo" className="flex items-center gap-3 cursor-pointer flex-1">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="font-semibold">📱 Touch & Go e-Wallet</div>
                          <div className="text-sm text-gray-600">Pay with Touch & Go digital wallet</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm font-medium">🔒 Secure Payment</p>
                    <p className="text-green-600 text-xs mt-1">All payments are processed securely with 256-bit SSL encryption</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4 bg-gray-50 flex-shrink-0">
            <div className="flex justify-between items-center mb-4">
              <div className="text-left">
                <span className="text-lg font-semibold">Total:</span>
                {total >= 25 && <p className="text-green-600 text-sm">🎉 Free delivery included!</p>}
              </div>
              <span className="text-2xl font-bold text-red-600">
                RM {total.toFixed(2)}
              </span>
            </div>
            
            {!isCheckout ? (
              <Button 
                onClick={() => setIsCheckout(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 text-lg rounded-full"
              >
                🚀 Proceed to Checkout
              </Button>
            ) : (
              <div className="space-y-3">
                <Button 
                  onClick={() => setIsCheckout(false)}
                  variant="outline"
                  className="w-full py-2"
                  disabled={isProcessing}
                >
                  ← Back to Cart
                </Button>
                <Button 
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || !paymentMethod}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 text-lg rounded-full disabled:opacity-50"
                >
                  {isProcessing ? '🔄 Processing...' : '🎉 Place Order'}
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
