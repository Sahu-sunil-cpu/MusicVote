"use client"
import React, { useEffect, useState } from 'react';
import { Play, User, LogOut, Settings, Wallet, Bell, Home, ArrowLeft, UserCircle } from 'lucide-react';
import { useApp } from './contexts/AppContext';
import AuthModal from './AuthModal';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const AppHeader: React.FC = () => {
  const { state, actions } = useApp();
  const path = usePathname();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();


  const isActive = (pathname: string) => {
    if (pathname === path) {
      return true;
    }
    return path === path;
  };

  useEffect(() => {
    actions.getUser();
  }, [])



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      router.push("/signin") 
  };

  return (
    <>
      <header className="bg-gray-900/80 backdrop-blur-lg shadow-xl border-b border-gray-800 fixed top-0 w-full z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <Home className="w-5 h-5" />
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">MusicVote</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link 
                href="/dashboard/queue" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Queue
              </Link>
              <Link 
                href="/dashboard/charts" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard/charts') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Charts
              </Link>
              <Link 
                href="/dashboard/rewards" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard/rewards') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Rewards
              </Link>
              <Link 
                href="/dashboard/profile" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard/profile') ? 'text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Profile
              </Link>
            </nav>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${state.connected ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className="text-sm text-gray-400 hidden sm:inline">
                  {state.connected ? 'Live' : 'Disconnected'}
                </span>
              </div>

              {state.user ? (
                <>
                  {/* Notifications */}
                  <button className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 bg-white text-gray-900 text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                      3
                    </span>
                  </button>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                    >
                      <div className="w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="hidden sm:inline font-medium text-white">{state.user.name}</span>
                    </button>

                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700 py-1">
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-sm font-medium text-white">{state.user.name}</p>
                          <p className="text-xs text-gray-400">{state.user.email}</p>
                        </div>
                        
                        <Link
                          href="/dashboard/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center space-x-2 transition-all duration-200"
                        >
                          <UserCircle className="w-4 h-4" />
                          <span>View Profile</span>
                        </Link>
                        
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center space-x-2 transition-all duration-200">
                          <Settings className="w-4 h-4" />
                          <span>Settings</span>
                        </button>
                        
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white flex items-center space-x-2 transition-all duration-200">
                          <Wallet className="w-4 h-4" />
                          <span>Wallet</span>
                        </button>
                        
                        <button
                          onClick={() => {
                            actions.logout();
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 hover:text-red-300 flex items-center space-x-2 transition-all duration-200"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-gray-900 text-white px-4 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105"
                >
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default AppHeader;