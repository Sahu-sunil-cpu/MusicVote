"use client"
import React, { useState, useEffect } from 'react';
import { Play, Vote, Coins, Trophy, Users, Zap } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const heroTexts = [
    "Vote Your Vibe. Let the Crowd Decide.",
    "Decentralized Music Democracy in Action.",
    "Your Voice, Your Choice, Your Rewards.",
    "Real-time Music Voting Revolution."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % heroTexts.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Vote className="w-6 h-6" />,
      title: "Democratic Voting",
      description: "Every vote matters in our decentralized music democracy"
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: "Crypto & UPI Payments",
      description: "Boost your favorite songs with seamless payment options"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Hourly Rewards",
      description: "Earn rewards for contributing the most popular tracks"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Updates",
      description: "Live synchronization across all connected users"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3">
              <Play className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold">MusicVote</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span 
              className={`block transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              {heroTexts[currentText]}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
            The world's first decentralized music voting platform where your taste shapes the playlist, 
            and top contributors earn real rewards every hour.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Users className="w-5 h-5 inline mr-2" />
              Join the Revolution
            </button>
            <button className="bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:bg-white/20">
              Learn How It Works
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
              <div className="text-gray-300">Live Voting</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Decentralized</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-400 mb-2">₹500+</div>
              <div className="text-gray-300">Hourly Rewards</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-300">Songs Supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;