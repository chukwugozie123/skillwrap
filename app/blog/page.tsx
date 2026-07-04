'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, MessageCircle, Bookmark, Share2, ArrowRight, Mail, Sparkles } from 'lucide-react'
import { useState, useMemo } from 'react'
import Image from 'next/image'

// Types
interface BlogArticle {
  id: string
  title: string
  excerpt: string
  category: string
  author: {
    name: string
    avatar: string
  }
  publishedDate: string
  readingTime: number
  views: number
  likes: number
  comments: number
  image: string
  featured?: boolean
}

interface BlogCategory {
  id: string
  name: string
  icon: string
  count: number
}

// Mock Data
const categories: BlogCategory[] = [
  { id: '1', name: 'Programming', icon: '💻', count: 24 },
  { id: '2', name: 'Web Development', icon: '🌐', count: 18 },
  { id: '3', name: 'Mobile Development', icon: '📱', count: 15 },
  { id: '4', name: 'UI/UX Design', icon: '🎨', count: 12 },
  { id: '5', name: 'Artificial Intelligence', icon: '🤖', count: 21 },
  { id: '6', name: 'Data Science', icon: '📊', count: 14 },
  { id: '7', name: 'Cybersecurity', icon: '🔒', count: 10 },
  { id: '8', name: 'Cloud Computing', icon: '☁️', count: 16 },
  { id: '9', name: 'Career Advice', icon: '🚀', count: 13 },
  { id: '10', name: 'Productivity', icon: '⚡', count: 11 },
  { id: '11', name: 'SkillWrap News', icon: '📰', count: 8 },
  { id: '12', name: 'Community Stories', icon: '👥', count: 9 },
  { id: '13', name: 'Events', icon: '🎪', count: 7 },
  { id: '14', name: 'Tutorials', icon: '📚', count: 19 },
]

const articles: BlogArticle[] = [
  {
    id: '1',
    title: 'Building Scalable Next.js Applications with Modern Patterns',
    excerpt: 'Discover the best practices for building scalable and performant Next.js applications using the latest features and patterns.',
    category: 'Web Development',
    author: { name: 'Alex Chen', avatar: '👨‍💻' },
    publishedDate: '2024-07-04',
    readingTime: 8,
    views: 2450,
    likes: 385,
    comments: 42,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'The Future of AI in Web Development',
    excerpt: 'Exploring how AI is transforming the way we build web applications and accelerate development workflows.',
    category: 'Artificial Intelligence',
    author: { name: 'Sarah Johnson', avatar: '👩‍💼' },
    publishedDate: '2024-07-03',
    readingTime: 6,
    views: 1820,
    likes: 312,
    comments: 38,
    image: 'https://images.unsplash.com/photo-1677442d019cecf8f80f1a18f89d496e?w=800&h=500&fit=crop',
  },
  {
    id: '3',
    title: 'Mastering TypeScript: Advanced Types and Patterns',
    excerpt: 'Deep dive into TypeScript\'s advanced type system and learn powerful patterns for building robust applications.',
    category: 'Programming',
    author: { name: 'Marcus Lee', avatar: '👨‍🏫' },
    publishedDate: '2024-07-02',
    readingTime: 10,
    views: 1650,
    likes: 298,
    comments: 31,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
  },
  {
    id: '4',
    title: 'React 19: New Features and Improvements',
    excerpt: 'Explore the exciting new features and improvements in React 19 and how to leverage them in your projects.',
    category: 'Web Development',
    author: { name: 'Emma Wilson', avatar: '👩‍💻' },
    publishedDate: '2024-07-01',
    readingTime: 7,
    views: 1540,
    likes: 267,
    comments: 29,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=500&fit=crop',
  },
  {
    id: '5',
    title: 'From Zero to Full Stack: A Career Roadmap',
    excerpt: 'A comprehensive guide to becoming a full-stack developer with practical tips and resources for every stage.',
    category: 'Career Advice',
    author: { name: 'James Rodriguez', avatar: '👨‍💼' },
    publishedDate: '2024-06-30',
    readingTime: 12,
    views: 2100,
    likes: 421,
    comments: 67,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
  },
  {
    id: '6',
    title: 'Designing Beautiful User Interfaces with Tailwind CSS',
    excerpt: 'Learn how to create stunning user interfaces efficiently using Tailwind CSS utility-first approach.',
    category: 'UI/UX Design',
    author: { name: 'Lisa Chen', avatar: '🎨' },
    publishedDate: '2024-06-29',
    readingTime: 8,
    views: 1760,
    likes: 334,
    comments: 45,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
  },
  {
    id: '7',
    title: 'Cloud Computing Essentials for Developers',
    excerpt: 'Essential knowledge about cloud computing platforms and how to deploy your applications effectively.',
    category: 'Cloud Computing',
    author: { name: 'David Kim', avatar: '☁️' },
    publishedDate: '2024-06-28',
    readingTime: 9,
    views: 1420,
    likes: 245,
    comments: 35,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
  },
  {
    id: '8',
    title: 'Web Security: Best Practices in 2024',
    excerpt: 'Stay secure with the latest web security practices and protect your applications from common vulnerabilities.',
    category: 'Cybersecurity',
    author: { name: 'Patricia Brown', avatar: '🔒' },
    publishedDate: '2024-06-27',
    readingTime: 11,
    views: 1890,
    likes: 356,
    comments: 52,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop',
  },
]

const popularTags = [
  'React',
  'Next.js',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'AI',
  'Machine Learning',
  'UI Design',
  'Career',
  'Skill Development',
  'Productivity',
]

const trendingArticles = articles.slice(0, 5)

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'mostRead' | 'picks'>('latest')
  const [currentPage, setCurrentPage] = useState(1)
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const articlesPerPage = 6

  // Filter and sort articles
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = !selectedCategory || article.category === selectedCategory
      return matchesSearch && matchesCategory
    })

    // Sort articles
    switch (sortBy) {
      case 'popular':
        return filtered.sort((a, b) => b.likes - a.likes)
      case 'mostRead':
        return filtered.sort((a, b) => b.views - a.views)
      case 'picks':
        return filtered.sort((a) => (a.featured ? -1 : 1))
      case 'latest':
      default:
        return filtered
    }
  }, [searchQuery, selectedCategory, sortBy])

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const toggleBookmark = (id: string) => {
    const newBookmarks = new Set(bookmarks)
    if (newBookmarks.has(id)) {
      newBookmarks.delete(id)
    } else {
      newBookmarks.add(id)
    }
    setBookmarks(newBookmarks)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/3 -left-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative pt-20 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-6xl mx-auto">
          {/* Hero Title */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                SkillWrap Blog
              </span>
            </h1>
            <p className="text-center text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Master new skills, stay updated with technology trends, and grow your career with our curated content for
              learners, mentors, and creators.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto mb-8"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles, tutorials, news..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-xl transition-all"
              />
            </div>
          </motion.div>

          {/* Trending Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto"
          >
            <span className="text-sm text-slate-400">Trending:</span>
            {['React', 'Next.js', 'AI', 'TypeScript'].map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/50 rounded-full text-sm text-blue-300 transition-all"
              >
                #{tag}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Article */}
      {articles[0] && (
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="relative px-4 sm:px-6 lg:px-8 py-12"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-xl p-1 cursor-pointer"
            >
              <div className="relative bg-slate-900 rounded-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6 p-6 sm:p-8">
                  {/* Image */}
                  <motion.div className="relative rounded-xl overflow-hidden h-80 md:h-full min-h-80">
                    <Image
                      src={articles[0].image}
                      alt={articles[0].title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </motion.div>

                  {/* Content */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 mb-4"
                      >
                        <span className="px-3 py-1 bg-blue-500/30 border border-blue-400/50 rounded-full text-xs font-semibold text-blue-300">
                          Featured
                        </span>
                        <span className="px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-300">
                          {articles[0].category}
                        </span>
                      </motion.div>

                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                        {articles[0].title}
                      </h2>
                      <p className="text-slate-300 text-lg mb-6">{articles[0].excerpt}</p>
                    </div>

                    {/* Meta */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 py-4 border-t border-white/10">
                        <span className="text-2xl">{articles[0].author.avatar}</span>
                        <div>
                          <p className="font-semibold text-white">{articles[0].author.name}</p>
                          <p className="text-sm text-slate-400">
                            {new Date(articles[0].publishedDate).toLocaleDateString()} • {articles[0].readingTime} min
                            read
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 flex-wrap text-sm text-slate-400">
                        <span>{articles[0].views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{articles[0].likes} likes</span>
                        <span>•</span>
                        <span>{articles[0].comments} comments</span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all group"
                      >
                        Read Full Article <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* Categories Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-bold text-white mb-8"
          >
            <Sparkles className="inline-block mr-2 w-8 h-8 text-blue-400" />
            Browse by Category
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.name ? null : category.name)
                  setCurrentPage(1)
                }}
                className={`relative p-4 rounded-xl backdrop-blur-xl transition-all ${
                  selectedCategory === category.name
                    ? 'bg-blue-500/30 border border-blue-400/60 shadow-lg shadow-blue-500/20'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h3 className="font-semibold text-white text-sm">{category.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{category.count} articles</p>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Filters & Articles */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between"
          >
            <div className="flex gap-2 flex-wrap">
              {(['latest', 'popular', 'mostRead', 'picks'] as const).map((option) => (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSortBy(option)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    sortBy === option
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {option === 'picks' ? "Editor's Picks" : option.charAt(0).toUpperCase() + option.slice(1)}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Articles Grid */}
          {paginatedArticles.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
            >
              {paginatedArticles.map((article) => (
                <motion.article
                  key={article.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-xl hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="absolute top-3 left-3"
                    >
                      <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-xl rounded-full text-xs font-semibold text-white">
                        {article.category}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col h-full">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">{article.excerpt}</p>

                    {/* Author */}
                    <div className="flex items-center gap-2 mb-4 mt-auto">
                      <span className="text-xl">{article.author.avatar}</span>
                      <div className="text-xs">
                        <p className="font-medium text-white">{article.author.name}</p>
                        <p className="text-slate-400">{new Date(article.publishedDate).toLocaleDateString()}</p>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 pb-4 border-b border-white/10">
                      <span>{article.readingTime} min</span>
                      <span>•</span>
                      <span>{article.views.toLocaleString()} views</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-blue-400 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleBookmark(article.id)}
                          className={`transition-colors ${
                            bookmarks.has(article.id) ? 'text-yellow-400' : 'text-slate-400 hover:text-slate-300'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" fill={bookmarks.has(article.id) ? 'currentColor' : 'none'} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-slate-400 hover:text-slate-300 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <Sparkles className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No articles found</h3>
              <p className="text-slate-400 mb-6">Try adjusting your search or filters</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory(null)
                  setCurrentPage(1)
                }}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold text-white transition-all"
              >
                Clear Filters
              </motion.button>
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && paginatedArticles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-2"
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {page}
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Popular Tags */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Popular Tags</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {popularTags.map((tag) => (
              <motion.button
                key={tag}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-400/30 rounded-full text-sm font-medium text-blue-300 transition-all"
              >
                #{tag}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-purple-600/20 border border-blue-400/30 backdrop-blur-xl p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />

            <div className="relative z-10">
              <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                  Never Miss an Update
                </h2>
                <p className="text-center text-slate-300 mb-8">
                  Subscribe to our newsletter and get the latest articles, tutorials, and community stories delivered
                  to your inbox.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                onSubmit={handleSubscribe}
                className="relative"
              >
                <div className="relative flex gap-2">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-xl transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-xl font-semibold text-white transition-all whitespace-nowrap"
                  >
                    Subscribe
                  </motion.button>
                </div>

                <AnimatePresence>
                  {subscribed && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 text-center text-green-400 font-medium"
                    >
                      ✓ Successfully subscribed!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              <p className="text-center text-xs text-slate-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Community Highlights */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Community Highlights</h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              {
                title: 'Creator Stories',
                description: 'Inspiring stories from our content creators and their journey',
                icon: '🎬',
              },
              {
                title: 'Student Success',
                description: 'Real transformations and career wins from learners',
                icon: '🎓',
              },
              {
                title: 'Mentor Spotlights',
                description: 'Meet the experts guiding our community',
                icon: '👑',
              },
              {
                title: 'Community Achievements',
                description: 'Celebrate milestones and collective victories',
                icon: '🏆',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-400/50 cursor-pointer transition-all group"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm">{item.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 flex items-center gap-2 text-blue-400 text-sm font-medium"
                >
                  Explore <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Footer CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 mb-10"
          >
            Join thousands of learners, mentors, and creators transforming their careers with SkillWrap.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg font-bold text-white transition-all shadow-lg shadow-blue-500/30"
            >
              Explore Skills
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 border border-white/20 hover:bg-white/20 rounded-lg font-bold text-white transition-all"
            >
              Join Community
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg font-bold text-white transition-all shadow-lg shadow-purple-500/30"
            >
              Become a Mentor
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="relative px-4 sm:px-6 lg:px-8 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-slate-400 text-sm">
          <p>
            © 2024 SkillWrap. All rights reserved. |{' '}
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>{' '}
            |{' '}
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}
