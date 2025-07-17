import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppHeader from '../../components/AppHeader';
import RewardsSection from '../../components/RewardsSection';

const RewardsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <AppHeader />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <RewardsSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            © 2024 MusicVote. All rights reserved. Democratizing music, one vote at a time.
          </div>
        </div>
      </footer>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#fff',
            border: '1px solid #374151',
          },
        }}
      />
    </div>
  );
};

export default RewardsPage;