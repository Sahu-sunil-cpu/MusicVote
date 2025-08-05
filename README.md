#  MusicVote – Real-Time Song Voting and Playback Platform

VotePlay is a decentralized, community-driven platform where users can vote for the next song to play. The song with the highest votes plays in real-time. Built using modern web technologies and integrated with blockchain payments, VotePlay combines interactivity, real-time engagement, and crypto utility.

---

##  Features

- ✅ **Real-Time Song Voting**
  - Users can vote on a list of songs in real-time.
  - The song with the highest votes plays next.

- 🔄 **WebSocket-Powered Live Updates**
  - Instant UI updates for votes and song changes using WebSockets.

- 🔐 **User Authentication**
  - Secure login and signup to access voting and song controls.

- 💰 **Crypto Payment Integration**
  - Supports **Solana** and **Ethereum** payments.
  - Optional feature to donate or pay to boost a song's vote weight.

- 📊 **Live Leaderboard**
  - Tracks top-voted songs in real-time.

- 🧩 **Tech Stack**
  - **Frontend**: Next.js, TypeScript, TailwindCSS
  - **Backend**: Node.js, Prisma, PostgreSQL, WebSockets
  - **Blockchain**: Solana & Ethereum wallet/payment integration


## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Sahu-sunil-cpu/MusicVote.git
cd voteplay
```
### 2. Run Application
```bash
cd app
npm install
# Add your environment variables in a `.env` file
# Add your local database url or serverless database url
npx prisma generate
npx prisma migrate dev
npm run dev



