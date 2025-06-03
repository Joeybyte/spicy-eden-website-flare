
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customer_name: string;
  total_amount: number;
  status: string;
  created_at: string;
  order_items: Array<{
    food_name: string;
    quantity: number;
    food_price: number;
  }>;
}

export const OrderStatus: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      let query = supabase
        .from('orders')
        .select(`
          *,
          order_items (
            food_name,
            quantity,
            food_price
          )
        `)
        .order('created_at', { ascending: false });

      // If user is logged in, show their orders; otherwise show recent orders
      if (user) {
        query = query.eq('user_id', user.id);
      } else {
        query = query.limit(5);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'confirmed': return '✅';
      case 'preparing': return '👨‍🍳';
      case 'delivered': return '🚚';
      case 'cancelled': return '❌';
      default: return '📋';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="text-center">
          <div className="text-4xl mb-2">🌶️</div>
          <p>Loading your spicy orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">🔥 Order Status</h3>
      
      {orders.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-6xl mb-4">📋</div>
            <p className="text-gray-500">No orders found</p>
            <p className="text-gray-400 text-sm mt-2">Your order history will appear here</p>
          </CardContent>
        </Card>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="border-l-4 border-l-red-600">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    Order #{order.id.slice(0, 8)}
                  </CardTitle>
                  <p className="text-gray-600">{order.customer_name}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()} at{' '}
                    {new Date(order.created_at).toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusEmoji(order.status)} {order.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2 mb-4">
                {order.order_items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.quantity}x {item.food_name}</span>
                    <span>RM {(item.food_price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total:</span>
                <span className="text-red-600">RM {Number(order.total_amount).toFixed(2)}</span>
              </div>
              
              {order.status === 'pending' && (
                <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    🕐 Your order is being reviewed. We'll confirm it shortly!
                  </p>
                </div>
              )}
              
              {order.status === 'preparing' && (
                <div className="mt-3 p-3 bg-orange-50 rounded-lg">
                  <p className="text-orange-800 text-sm">
                    👨‍🍳 Our chefs are preparing your spicy feast! Estimated time: 20-30 minutes
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
      
      <Button 
        onClick={loadOrders}
        variant="outline"
        className="w-full"
      >
        🔄 Refresh Orders
      </Button>
    </div>
  );
};
