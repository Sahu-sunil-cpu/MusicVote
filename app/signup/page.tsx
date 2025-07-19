"use client"

import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Chrome, Wallet, Play, Music, Users, TrendingUp, Star, Mic, Radio, Volume2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useApp } from '../components/contexts/AppContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const { actions } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasMounted, sethasMounted] = useState(false);
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [notSuccess, setNotSuccess] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    sethasMounted(true);
  })

  const visualImages = [
    {
      url: "https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Start Your Music Journey",
      subtitle: "Join thousands of artists and music lovers"
    },
    {
      url: "https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Connect with Music Lovers",
      subtitle: "Build your fanbase and earn rewards"
    },
    {
      url: "https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Professional Music Tools",
      subtitle: "Everything you need to promote your music"
    },
    {
      url: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Live Performance Platform",
      subtitle: "Schedule live sessions and engage with fans"
    },
    {
      url: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=800",
      title: "Music Democracy",
      subtitle: "Where every vote shapes the future of music"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % visualImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [visualImages.length, hasMounted]);

  if (!hasMounted) return null;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      setIsPasswordMatched(true)
      return;
    }

    setIsLoading(true);

    try {
      const {success, error} = await actions.signup('email', formData.name, formData.password, formData.email);

      if (!success) {
        toast.error('Account created successfully!');
        setNotSuccess(false);
        setError(error)
        return;
      }
      toast.success('please verify email');

      localStorage.setItem("email", JSON.stringify({email: formData.email } ))

      
      router.push('/processVerifyEmail');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    // setIsLoading(true);
    // try {
    //   await actions.login('google', { name: 'Google User', email: 'user@gmail.com' });
    //   toast.success('Account created successfully!');
    //   router.push('/dashboard');
    // } catch (error) {
    //   toast.error('Google sign-up failed. Please try again.');
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
    //   router.push('/dashboard');
    // } catch (error) {
    //   toast.error('Wallet connection failed. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Pane - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
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
            <h1 className="text-3xl font-bold text-white mb-2">Create your account</h1>
            <p className="text-gray-400">Join the music revolution today</p>
          </div>

          {/* Social Sign Up */}
          <div className="space-y-3 mb-6">
            <button
              onClick={handleGoogleSignUp}
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
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-300"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" className="rounded border-gray-600 text-purple-600 focus:ring-purple-500" required />
              <span className="ml-2 text-sm text-gray-400">
                I agree to the{' '}
                <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                  Privacy Policy
                </Link>
              </span>
            </div>
            {
              isPasswordMatched && <div className="flex items-center">
                <span className="ml-2 text-sm text-red-400">
                  confirm password didn't match
                </span>
              </div>
            }

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
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <Link href="/signin" className="text-purple-400 hover:text-purple-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Pane - Dynamic Animations */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </div>
        </div>

        {/* Dynamic Background Image */}
        <div className="absolute inset-0">
          <img
            src={visualImages[currentImageIndex].url}
            alt="Music Platform"
            className="w-full h-full object-cover transition-all duration-1000 ease-in-out opacity-20"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12">
          {/* Floating Music Icons */}
          <div className="absolute top-20 left-20 w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center animate-pulse">
            <Music className="w-8 h-8 text-purple-400" />
          </div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse animation-delay-2000">
            <Mic className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute bottom-40 left-16 w-14 h-14 bg-pink-500/20 rounded-full flex items-center justify-center animate-pulse animation-delay-4000">
            <Radio className="w-7 h-7 text-pink-400" />
          </div>
          <div className="absolute bottom-20 right-32 w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse animation-delay-1000">
            <Volume2 className="w-5 h-5 text-green-400" />
          </div>

          {/* Main Content */}
          <div className="mb-8 max-w-lg">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Play className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">
              {visualImages[currentImageIndex].title}
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              {visualImages[currentImageIndex].subtitle}
            </p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 gap-6 mb-8 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1 animate-pulse">10K+</div>
              <p className="text-sm text-gray-300">Active Artists</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1 animate-pulse animation-delay-1000">50K+</div>
              <p className="text-sm text-gray-300">Songs Voted</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1 animate-pulse animation-delay-2000">₹2M+</div>
              <p className="text-sm text-gray-300">Rewards Paid</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 transform hover:scale-105 transition-all duration-300">
              <div className="text-2xl font-bold text-white mb-1 animate-pulse animation-delay-3000">100+</div>
              <p className="text-sm text-gray-300">Countries</p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Group Listen</h3>
              <p className="text-xs text-gray-300">Connect with others</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
              <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Earn Rewards</h3>
              <p className="text-xs text-gray-300">Get paid for votes</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Live Sessions</h3>
              <p className="text-xs text-gray-300">Perform live</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 transition-all duration-300">
              <Music className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">Vote Music</h3>
              <p className="text-xs text-gray-300">Democratic playlist</p>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="flex space-x-2 mt-8">
            {visualImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;