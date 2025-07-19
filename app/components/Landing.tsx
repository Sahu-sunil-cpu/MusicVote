"use client"

import React, { useState, useEffect } from 'react';
import { Play, Vote, Coins, Trophy, Users, Zap, ArrowRight, Music, Headphones, Star, Calendar, DollarSign, Radio, Clock, Mic, Volume2, MessageCircle, Globe, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthModal from '../components/AuthModal';

const LandingPage: React.FC = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroTexts = [
    "Vote Your Vibe. Let the Crowd Decide.",
    "Artists, Schedule Your Live Sessions.",
    "Real-time Music Democracy in Action.",
    "Promote Your Music. Reach New Fans."
  ];

  const heroImages = [
    "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800", // DJ mixing
    "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800", // Concert crowd
    "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800", // Singer performing
    "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800", // Music studio
    "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800", // Live concert
    "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800", // Music equipment
    "https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=800", // Artist with guitar
    "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800"  // Music festival
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

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => clearInterval(imageInterval);
  }, [heroImages.length]);
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
                <a href="#group-listening" className="text-gray-300 hover:text-white transition-colors">Group Listening</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => window.location.href = '/signin'}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => window.location.href = '/signup'}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
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
                  <button
                    onClick={() => window.location.href = '/signup'}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white font-semibold py-4 px-8 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                  >
                    <Users className="w-5 h-5" />
                    <span>Start Voting Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => window.location.href = '/signin'}
                    className="bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:bg-white/20"
                  >
                    Sign In
                  </button>
                </div>
              </div>

              {/* Right Content - Dynamic Images */}
              <div className="relative">
                <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-2xl">
                  {/* Main Image */}
                  <div className="relative w-full h-full">
                    <img
                      src={heroImages[currentImageIndex]}
                      alt="Music Platform"
                      className="w-full h-full object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
                      style={{
                        opacity: isVisible ? 1 : 0,
                        transform: `scale(${isVisible ? 1 : 1.1})`,
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-8 left-8 right-8">
                      <div className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {currentImageIndex === 0 && "Live Music Democracy"}
                          {currentImageIndex === 1 && "Real-time Audience Engagement"}
                          {currentImageIndex === 2 && "Artist Live Performances"}
                          {currentImageIndex === 3 && "Professional Music Studio"}
                          {currentImageIndex === 4 && "Live Concert Experience"}
                          {currentImageIndex === 5 && "Music Production Tools"}
                          {currentImageIndex === 6 && "Independent Artists Platform"}
                          {currentImageIndex === 7 && "Music Festival Atmosphere"}
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {currentImageIndex === 0 && "Where every vote shapes the playlist"}
                          {currentImageIndex === 1 && "Connect with fans in real-time"}
                          {currentImageIndex === 2 && "Schedule and perform live sessions"}
                          {currentImageIndex === 3 && "Professional tools for artists"}
                          {currentImageIndex === 4 && "Bring the concert experience online"}
                          {currentImageIndex === 5 && "Create and promote your music"}
                          {currentImageIndex === 6 && "Empower independent musicians"}
                          {currentImageIndex === 7 && "Community-driven music discovery"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {heroImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white w-8' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
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

        {/* Group Listening Feature Section */}
        <section id="group-listening" className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Listen Together, Vote Together</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Create or join listening groups to enjoy music with friends and fellow music lovers. 
                Experience synchronized playback and real-time voting in private or public groups.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold mb-6 text-white">Connect & Listen</h3>
                <p className="text-xl text-gray-400 mb-8">
                  Join thousands of music lovers in real-time listening sessions. Create your own groups 
                  or discover new communities based on your favorite genres and artists.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Create Private Groups</h4>
                      <p className="text-gray-400">Invite friends to your exclusive listening parties with up to 100 members per group.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Real-time Chat</h4>
                      <p className="text-gray-400">Discuss songs, share reactions, and connect with group members through live chat.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Play className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Synchronized Playback</h4>
                      <p className="text-gray-400">Everyone in the group hears the same song at the same time, creating a shared experience.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg rounded-3xl p-8 border border-gray-700">
                  {/* Mock Group Interface */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Rock Legends Group</h3>
                    <p className="text-gray-400">24 members listening</p>
                  </div>
                  
                  {/* Currently Playing */}
                  <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Bohemian Rhapsody</p>
                        <p className="text-sm text-gray-400">Queen</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>2:34</span>
                      <span>5:55</span>
                    </div>
                  </div>
                  
                  {/* Online Members */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Online Members</h4>
                    <div className="space-y-2">
                      {['Alex M.', 'Sarah K.', 'Mike R.', 'Emma L.'].map((name, index) => (
                        <div key={name} className="flex items-center space-x-3">
                          <div className="relative w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-white">{name.charAt(0)}</span>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-800"></div>
                          </div>
                          <span className="text-sm text-white">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Group Features */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Public Groups</h3>
                <p className="text-gray-400 leading-relaxed">
                  Discover and join public listening groups based on genres, moods, or themes. 
                  Meet new people who share your musical taste.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Private Sessions</h3>
                <p className="text-gray-400 leading-relaxed">
                  Create invite-only groups for intimate listening sessions with friends, 
                  family, or close music communities.
                </p>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Live Interaction</h3>
                <p className="text-gray-400 leading-relaxed">
                  Chat in real-time, react to songs, and vote together. 
                  Experience music as a social activity like never before.
                </p>
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