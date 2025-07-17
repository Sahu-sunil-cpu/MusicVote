"use client"
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Wallet, Crown } from 'lucide-react';
import { Song } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
  onPaymentSuccess: (amount: number, method: 'upi' | 'crypto') => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ 
  isOpen, 
  onClose, 
  song, 
  onPaymentSuccess 
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'crypto'>('upi');
  const [amount, setAmount] = useState(50);
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      onPaymentSuccess(amount, paymentMethod);
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const promotionTiers = [
    { amount: 50, boost: '2x Priority', duration: '1 hour' },
    { amount: 100, boost: '3x Priority', duration: '2 hours' },
    { amount: 250, boost: '5x Priority', duration: '6 hours' },
    { amount: 500, boost: '10x Priority', duration: '12 hours' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Crown className="w-6 h-6 text-yellow-400 mr-2" />
              Promote Song
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Song Info */}
          <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-700/50 rounded-lg">
            <img
              src={song.thumbnail}
              alt={song.title}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold text-white">{song.title}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('upi')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <Smartphone className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <span className="text-sm font-medium text-white">UPI</span>
              </button>
              <button
                onClick={() => setPaymentMethod('crypto')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  paymentMethod === 'crypto'
                    ? 'border-purple-500 bg-purple-500/10'
                    : 'border-gray-600 hover:border-gray-500'
                }`}
              >
                <Wallet className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                <span className="text-sm font-medium text-white">Crypto</span>
              </button>
            </div>
          </div>

          {/* Promotion Tiers */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Promotion Tier
            </label>
            <div className="space-y-2">
              {promotionTiers.map((tier) => (
                <button
                  key={tier.amount}
                  onClick={() => setAmount(tier.amount)}
                  className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                    amount === tier.amount
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-white">
                        ₹{tier.amount}
                      </div>
                      <div className="text-sm text-gray-400">
                        {tier.boost} • {tier.duration}
                      </div>
                    </div>
                    <div className="text-purple-400 font-bold">
                      {tier.boost}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <form onSubmit={handlePayment} className="space-y-4">
            {paymentMethod === 'upi' && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-gray-700 text-white placeholder-gray-400"
                  placeholder="yourname@paytm"
                  required
                />
              </div>
            )}

            {paymentMethod === 'crypto' && (
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Wallet className="w-5 h-5 text-blue-400" />
                  <span className="font-medium text-blue-300">Wallet Payment</span>
                </div>
                <p className="text-sm text-blue-200">
                  You'll be redirected to connect your wallet and complete the payment.
                </p>
              </div>
            )}

            <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 rounded-lg border border-yellow-500/30">
              <h4 className="font-medium text-yellow-300 mb-2">Promotion Benefits:</h4>
              <ul className="text-sm text-yellow-200 space-y-1">
                <li>• Higher position in the voting queue</li>
                <li>• Special highlight and crown badge</li>
                <li>• Increased visibility to all users</li>
                <li>• Better chances of being played next</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isProcessing || (paymentMethod === 'upi' && !upiId)}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              {isProcessing ? 'Processing Payment...' : `Pay ₹${amount} & Promote`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;