export interface Song {
  id: string;
  title: string;
  artist: string;
  youtubeId: string;
  thumbnail: string;
  submittedBy: string;
  submittedAt: Date;
  likes: number;
  dislikes: number;
  plays: number;
  isPromoted: boolean;
  promotionAmount?: number;
  userVotes: Record<string, 'like' | 'dislike'>;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  walletAddress?: string;
  avatar?: string;
  authType: 'email' | 'wallet' | 'google';
  totalRewards: number;
  songsSubmitted: number;
  votesGiven: number;
  bio?: string;
  location?: string;
  genre?: string;
  socialLinks?: {
    youtube?: string;
    spotify?: string;
    instagram?: string;
    twitter?: string;
  };
  joinedAt: Date;
  totalEarnings: number;
  totalPlays: number;
  averageRating: number;
  followers: number;
  following: number;
}

export interface RewardSession {
  id: string;
  startTime: Date;
  endTime: Date;
  topSong: Song;
  winner: User;
  rewardAmount: number;
  status: 'active' | 'completed' | 'pending';
}

export interface PaymentMethod {
  type: 'upi' | 'crypto';
  details: {
    upiId?: string;
    walletAddress?: string;
    network?: string;
  };
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  duration?: number;
}

export interface SongSection {
  timestamp: number;
  duration: number;
  likes: number;
  dislikes: number;
  section: 'intro' | 'verse' | 'chorus' | 'bridge' | 'outro';
}

export interface ArtistStats {
  totalSongs: number;
  totalVotes: number;
  totalEarnings: number;
  totalPlays: number;
  averageRating: number;
  topSong: Song;
  recentEarnings: {
    date: Date;
    amount: number;
    song: string;
    source: 'votes' | 'promotion' | 'plays';
  }[];
  monthlyStats: {
    month: string;
    earnings: number;
    plays: number;
    votes: number;
  }[];
}