"use client"

import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Chrome, Wallet, Play, Music, Users, TrendingUp, Star, Headphones } from 'lucide-react';
import toast from 'react-hot-toast';
import { useApp } from '../components/contexts/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInPage: React.FC = () => {
  const { actions } = useApp();
  const route = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasMounted, sethasMounted] = useState(false);
  const [notSuccess, setNotSuccess] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    sethasMounted(true);
  })

  const visualImages = [
    {
      url: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Live Music Democracy",
      subtitle: "Where every vote shapes the playlist"
    },
    {
      url: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Real-time Audience Engagement",
      subtitle: "Connect with fans in real-time"
    },
    {
      url: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Artist Live Performances",
      subtitle: "Schedule and perform live sessions"
    },
    {
      url: "https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Professional Music Studio",
      subtitle: "Professional tools for artists"
    },
    {
      url: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Live Concert Experience",
      subtitle: "Bring the concert experience online"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % visualImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visualImages.length, hasMounted]);

  if(!hasMounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const {success, error} = await actions.signin('email', formData.email, formData.password);


      console.log(error)
      if (!success && error == "email is not verified") {
        setNotSuccess(false);
        setError(error)
        toast.success('please verify email');
        
        localStorage.setItem("email", JSON.stringify({email: formData.email } ))

        route.push('/processVerifyEmail');
        return;
      }else if(!success && error != "email is not verified") {
        setNotSuccess(false);
        setError(error);
        return;
      }
     
      console.log(formData)
      toast.success('Welcome back!');
      route.push('/dashboard');

    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // setIsLoading(true);
    // try {
    //   await actions.login('google', { name: 'Google User', email: 'user@gmail.com' });
    //   toast.success('Welcome back!');
    //   route.push('/dashboard');
    // } catch (error) {
    //   toast.error('Google sign-in failed. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleWalletConnect = async () => {
    // setIsLoading(true);
    // try {
    //   await actions.login('wallet', { 
    //     name: 'Wallet User', 
    //     walletAddress: '0x742d35Cc6634C0532925a3b8D3aC19E6E7EA46F1' 
    //   });
    //   toast.success('Wallet connected successfully!');
    //   route.push('/dashboard');
    // } catch (error) {
    //   toast.error('Wallet connection failed. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Pane - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12 ">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">MusicVote</span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-gray-400">Sign in to your account to continue</p>
          </div>

          {/* Social Sign In */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </button>
            
            <button
              onClick={handleWalletConnect}
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-3 py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50"
            >
              <Wallet className="w-5 h-5" />
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">Or continue with email</span>
            </div>
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-600 text-purple-600 focus:ring-purple-500" />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>

            {
              !notSuccess && <div className="flex items-center">
                <span className="ml-2 text-sm text-red-400">
                  {error}
                </span>
              </div>
            }

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Pane - Dynamic Visuals */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={visualImages[currentImageIndex].url}
            alt="Music Platform"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-black/80" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              {visualImages[currentImageIndex].title}
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              {visualImages[currentImageIndex].subtitle}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <Music className="w-8 h-8 text-purple-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">Live Voting</h3>
              <p className="text-sm text-gray-300">Real-time democracy</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <Users className="w-8 h-8 text-blue-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">Group Listen</h3>
              <p className="text-sm text-gray-300">Connect with others</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <TrendingUp className="w-8 h-8 text-green-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">Earn Rewards</h3>
              <p className="text-sm text-gray-300">Get paid for votes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <Star className="w-8 h-8 text-yellow-400 mb-2" />
              <h3 className="font-semibold text-white mb-1">Artist Tools</h3>
              <p className="text-sm text-gray-300">Promote your music</p>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="flex space-x-2">
            {visualImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'bg-white w-8' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
          <Headphones className="w-8 h-8 text-purple-400" />
        </div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse animation-delay-2000">
          <Play className="w-6 h-6 text-blue-400" />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;