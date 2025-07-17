"use client";
import React, { useState, useEffect } from 'react';
import { Play, Vote, Coins, Trophy, Users, Zap, ArrowRight, Music, Headphones, Star, Calendar, DollarSign, Radio, Clock, Mic, Volume2 } from 'lucide-react';
import AuthModal from '../components/AuthModal';
import Link from 'next/link';

const LandingPage: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const heroTexts = [
    "Vote Your Vibe. Let the Crowd Decide.",
    "Artists, Schedule Your Live Sessions.",
    "Real-time Music Democracy in Action.",
    "Promote Your Music. Reach New Fans."
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

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MusicVote</span>
              </div>
              
              <div className="hidden md:flex space-x-8">
                <a href="#artist-platform" className="text-gray-300 hover:text-white transition-colors">For Artists</a>
                <a href="#live-sessions" className="text-gray-300 hover:text-white transition-colors">Live Sessions</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <Link
                  href="/dashboard"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Launch App
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden pt-16">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <div className="flex items-center mb-8">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 border border-white/20">
                    <Star className="w-6 h-6 text-yellow-400" />
                    <span className="text-lg font-semibold">Decentralized Music Platform</span>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  <span 
                    className={`block transition-all duration-500 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}
                  >
                    {heroTexts[currentText]}
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  The world's first decentralized music voting platform where artists can schedule live sessions, 
                  promote their tracks, and connect with fans through real-time voting democracy.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/queue"
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>Start Voting Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:bg-white/20"
                  >
                    Join as Artist
                  </button>
                </div>
              </div>

              {/* Right Content - Dynamic Images */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
                        <Music className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Live Voting</h3>
                      <p className="text-sm text-gray-300">Real-time democracy in action</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                        <Radio className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Live Sessions</h3>
                      <p className="text-sm text-gray-300">Schedule your performances</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Earn Rewards</h3>
                      <p className="text-sm text-gray-300">Get paid for popular tracks</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mb-4">
                        <Mic className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Artist Tools</h3>
                      <p className="text-sm text-gray-300">Promote and schedule</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Artist Platform Section */}
        <section id="artist-platform" className="py-24 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">For Artists & Musicians</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Take control of your music promotion with scheduled live sessions, 
                real-time fan engagement, and direct monetization opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Schedule Live Sessions</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Book specific time slots to play your music live. Choose peak hours for maximum audience engagement 
                  and real-time voting interaction.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Choose your preferred time slots</li>
                  <li>• Real-time audience interaction</li>
                  <li>• Live voting and feedback</li>
                  <li>• Performance analytics</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Flexible Pricing Plans</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Pay only for the exposure you want. Choose from hourly slots, daily packages, 
                  or premium promotion bundles to fit your budget.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Hourly session booking: ₹500/hour</li>
                  <li>• Daily promotion: ₹2000/day</li>
                  <li>• Premium bundle: ₹5000/week</li>
                  <li>• Revenue sharing available</li>
                </ul>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 transform hover:scale-105">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                  <Radio className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Live Performance Tools</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Professional tools for live streaming your music with real-time audience engagement, 
                  voting systems, and instant feedback mechanisms.
                </p>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• HD audio streaming quality</li>
                  <li>• Real-time chat integration</li>
                  <li>• Voting and reaction systems</li>
                  <li>• Performance metrics dashboard</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Live Sessions Section */}
        <section id="live-sessions" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6 text-white">Live Music Sessions</h2>
                <p className="text-xl text-gray-400 mb-8">
                  Connect with your audience in real-time. Schedule live performances, 
                  get instant feedback, and build a loyal fanbase through our interactive platform.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Flexible Scheduling</h3>
                      <p className="text-gray-400">Book time slots that work for you and your audience. Peak hours available for premium rates.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Volume2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">High-Quality Streaming</h3>
                      <p className="text-gray-400">Professional audio quality with low latency for the best live performance experience.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-2">Real-time Engagement</h3>
                      <p className="text-gray-400">Interact with your audience through live voting, comments, and instant reactions.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Radio className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Live Now</h3>
                    <p className="text-gray-400">Artist performing live</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">Current Song</span>
                        <span className="text-green-400 text-sm">● LIVE</span>
                      </div>
                      <p className="text-gray-400">Amazing Track by Artist Name</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">1,234</div>
                        <div className="text-sm text-gray-400">Live Viewers</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">89%</div>
                        <div className="text-sm text-gray-400">Positive Votes</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 bg-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-400">Choose the plan that fits your promotion needs</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Hourly Session</h3>
                <div className="text-3xl font-bold text-white mb-6">₹500<span className="text-lg text-gray-400">/hour</span></div>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li>• 1 hour live session</li>
                  <li>• Real-time voting</li>
                  <li>• Basic analytics</li>
                  <li>• Standard audio quality</li>
                </ul>
                <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                  Book Session
                </button>
              </div>

              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/50 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Daily Promotion</h3>
                <div className="text-3xl font-bold text-white mb-6">₹2,000<span className="text-lg text-gray-400">/day</span></div>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li>• 24-hour promotion</li>
                  <li>• Priority queue placement</li>
                  <li>• Advanced analytics</li>
                  <li>• HD audio quality</li>
                  <li>• Social media integration</li>
                </ul>
                <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                  Start Promotion
                </button>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Premium Bundle</h3>
                <div className="text-3xl font-bold text-white mb-6">₹5,000<span className="text-lg text-gray-400">/week</span></div>
                <ul className="space-y-3 text-gray-300 mb-8">
                  <li>• 7-day premium promotion</li>
                  <li>• Multiple live sessions</li>
                  <li>• Detailed analytics dashboard</li>
                  <li>• Studio-quality audio</li>
                  <li>• Dedicated support</li>
                  <li>• Revenue sharing program</li>
                </ul>
                <button className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200">
                  Go Premium
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">MusicVote</span>
              </div>
              <div className="text-gray-400 text-center">
                © 2024 MusicVote. All rights reserved. Democratizing music, one vote at a time.
              </div>
            </div>
          </div>
        </footer>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default LandingPage;