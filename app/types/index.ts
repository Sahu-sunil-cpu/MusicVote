type StreamType = 'youtube' | 'spotify'

export interface Song {
  creatorId: string,
  type: StreamType
  url: string
}

export interface User {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
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


export interface AppState {
  user: User | null;
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  notifications: Notification[];
  rewardSessions: RewardSession[];
  connected: boolean;
  isLoading: boolean;
}
