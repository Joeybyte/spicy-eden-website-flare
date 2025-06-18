
import React from 'react';
import { Button } from '@/components/ui/button';

interface FooterProps {
  onChatClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onChatClick }) => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🌶️</span>
              <h3 className="text-2xl font-bold">Spicy Eden Kitchen</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Igniting taste buds with authentic spicy flavors. We deliver the perfect balance of heat and taste, 
              crafted for both spice lovers and flavor seekers.
            </p>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white rounded-full"
              onClick={onChatClick}
            >
              🔥 Chat with Us
            </Button>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span className="text-gray-300">hello@spicyeden.my</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span className="text-gray-300">+60 3-2345 6789</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span className="text-gray-300">Kuala Lumpur, Malaysia</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕒</span>
                <span className="text-gray-300">Daily 10 AM - 11 PM</span>
              </div>
            </div>
          </div>

          {/* Social & Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-yellow-400">Follow Us</h4>
            <div className="space-y-3">
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600">
                  📘 Facebook
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600">
                  📷 Instagram
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-red-600 hover:border-red-600">
                  🐦 Twitter
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <h5 className="font-semibold mb-2 text-yellow-400">Quick Links</h5>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="cursor-pointer hover:text-red-400">Menu</div>
                <div className="cursor-pointer hover:text-red-400">Delivery Areas</div>
                <div className="cursor-pointer hover:text-red-400">About Us</div>
                <div className="cursor-pointer hover:text-red-400">Terms & Conditions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Spicy Eden Kitchen. All rights reserved. Made with 🌶️ and passion.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Bringing you the finest spicy cuisine in Malaysia
          </p>
        </div>
      </div>
    </footer>
  );
};
