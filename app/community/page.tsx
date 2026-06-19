'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Bell,
  Users,
  Plus,
  Hash,
  MoreHorizontal,
  TrendingUp,
  Zap,
  Clock,
  Activity,
} from 'lucide-react'

// Mock data
const mockChannels = [
  { id: 1, name: 'general', active: true },
  { id: 2, name: 'announcements' },
  { id: 3, name: 'help' },
  { id: 4, name: 'showcase' },
  { id: 5, name: 'random' },
]

const mockPosts = [
  {
    id: 1,
    author: 'Sarah Chen',
    avatar: 'SC',
    timestamp: '2 hours ago',
    content: 'Just launched our new feature! Super excited to see what the community thinks. Would love feedback on the new dashboard UI.',
    likes: 342,
    comments: 45,
    liked: false,
    image: null,
  },
  {
    id: 2,
    author: 'Marcus Johnson',
    avatar: 'MJ',
    timestamp: '4 hours ago',
    content: 'Anyone else working on skill exchanges? Built a matching algorithm that seems to work pretty well. Open to collaborate!',
    likes: 218,
    comments: 67,
    liked: false,
    image: null,
  },
  {
    id: 3,
    author: 'Alex Rivera',
    avatar: 'AR',
    timestamp: '6 hours ago',
    content: 'The community has grown so much in the last month! We went from 500 to 2,500 active members. Thank you all for being amazing!',
    likes: 891,
    comments: 123,
    liked: false,
    image: null,
  },
  {
    id: 4,
    author: 'Jordan Lee',
    avatar: 'JL',
    timestamp: '8 hours ago',
    content: 'New learning path for web development is live. Check it out and let me know what you think. Designed with beginners in mind.',
    likes: 445,
    comments: 89,
    liked: false,
    image: null,
  },
  {
    id: 5,
    author: 'Emma Williams',
    avatar: 'EW',
    timestamp: '10 hours ago',
    content: 'Mentorship matching is now available! Sign up if you want to connect with experienced members. First 100 get priority matching.',
    likes: 567,
    comments: 156,
    liked: false,
    image: null,
  },
]

const mockUsers = [
  { id: 1, name: 'Sarah Chen', avatar: 'SC', online: true },
  { id: 2, name: 'Marcus Johnson', avatar: 'MJ', online: true },
  { id: 3, name: 'Alex Rivera', avatar: 'AR', online: false },
  { id: 4, name: 'Jordan Lee', avatar: 'JL', online: true },
  { id: 5, name: 'Emma Williams', avatar: 'EW', online: false },
  { id: 6, name: 'David Park', avatar: 'DP', online: true },
]

const mockTrendingPosts = [
  { id: 1, title: 'New Feature: AI-Powered Matching', views: 5234, trending: true },
  { id: 2, title: 'Community Milestone: 10k Members!', views: 4125, trending: true },
  { id: 3, title: 'Mentorship Success Stories', views: 3456, trending: false },
  { id: 4, title: 'Building Your First Skill Exchange', views: 2890, trending: false },
]

interface Post {
  id: number
  author: string
  avatar: string
  timestamp: string
  content: string
  likes: number
  comments: number
  liked: boolean
  image: null
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [activeChannel, setActiveChannel] = useState(1)
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const handleLike = (postId: number) => {
    setLikedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId)
      }
      return [...prev, postId]
    })
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: !likedPosts.includes(postId) ? post.likes + 1 : post.likes - 1,
            }
          : post
      )
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-slate-900/80 backdrop-blur-xl border-r border-cyan-500/20 flex flex-col relative z-10"
      >
        {/* Logo Area */}
        <div className="p-6 border-b border-cyan-500/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">SkillWrap</h1>
              <p className="text-cyan-400 text-xs">Community</p>
            </div>
          </div>
        </div>

        {/* Channels */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">
            Channels
          </p>
          <div className="space-y-1">
            {mockChannels.map((channel) => (
              <motion.button
                key={channel.id}
                onClick={() => setActiveChannel(channel.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                  activeChannel === channel.id
                    ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Hash className="w-4 h-4" />
                <span className="text-sm">{channel.name}</span>
              </motion.button>
            ))}
          </div>

          <button className="w-full flex items-center gap-2 px-3 py-3 mt-6 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all">
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">Create Channel</span>
          </button>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-cyan-500/10">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-all cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
              YOU
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Your Profile</p>
              <p className="text-xs text-slate-400">Member since 2024</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <motion.div
          initial={{ y: -60 }}
          animate={{ y: 0 }}
          className="bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20 px-8 py-4 flex items-center justify-between relative z-10"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">general</h2>
            </div>
            <p className="text-slate-400 text-sm">Community discussions and announcements</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-48">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-slate-800/50 transition-all">
              <Bell className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
              <Users className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300">2,547 online</span>
            </div>
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex gap-6 p-6">
          {/* Feed */}
          <div className="flex-1 overflow-y-auto space-y-4">
            {/* Pinned Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 sticky top-0 z-20"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <p className="text-sm font-semibold text-cyan-300">Pinned: New Community Features</p>
              </div>
              <p className="text-sm text-slate-300">Check out our latest updates including AI-powered matching and mentorship programs.</p>
            </motion.div>

            {/* Posts Feed */}
            <AnimatePresence>
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 rounded-xl p-5 transition-all group"
                >
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                        {post.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{post.author}</h3>
                        <p className="text-xs text-slate-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-700/50 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{post.content}</p>

                  {/* Post Image Placeholder */}
                  {post.image && (
                    <div className="w-full h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg mb-4 border border-cyan-500/20" />
                  )}

                  {/* Post Footer */}
                  <div className="flex items-center justify-between text-xs text-slate-500 border-t border-slate-700/50 pt-3">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        likedPosts.includes(post.id)
                          ? 'text-cyan-400 bg-cyan-500/20'
                          : 'hover:text-cyan-400 hover:bg-slate-700/50'
                      }`}
                    >
                      <Heart
                        className="w-4 h-4"
                        fill={likedPosts.includes(post.id) ? 'currentColor' : 'none'}
                      />
                      <span>{likedPosts.includes(post.id) ? post.likes + 1 : post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-all">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 px-3 py-2 hover:text-cyan-400 hover:bg-slate-700/50 rounded-lg transition-all">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Right Sidebar */}
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="w-72 space-y-4 overflow-y-auto"
          >
            {/* Online Members */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Online Members
              </h3>
              <div className="space-y-2">
                {mockUsers.map((user) => (
                  <motion.div
                    key={user.id}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-all"
                  >
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                        {user.avatar}
                      </div>
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-800 ${
                          user.online ? 'bg-green-500' : 'bg-slate-500'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.online ? 'Active now' : 'Offline'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Total Members</span>
                  <span className="text-sm font-semibold text-cyan-300">2,547</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Active Today</span>
                  <span className="text-sm font-semibold text-cyan-300">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Posts This Week</span>
                  <span className="text-sm font-semibold text-cyan-300">324</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">New Members</span>
                  <span className="text-sm font-semibold text-cyan-300">+128</span>
                </div>
              </div>
            </div>

            {/* Trending Posts */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Trending Posts
              </h3>
              <div className="space-y-3">
                {mockTrendingPosts.map((trendPost) => (
                  <motion.div
                    key={trendPost.id}
                    whileHover={{ x: 4 }}
                    className="p-3 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-all border border-transparent hover:border-cyan-500/30"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-xs font-medium text-white leading-tight flex-1">
                        {trendPost.title}
                      </p>
                      {trendPost.trending && (
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-cyan-500/30 text-cyan-300 whitespace-nowrap">
                          Trending
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-2">{trendPost.views} views</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
