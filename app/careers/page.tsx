'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  MapPin,
  Briefcase,
  Users,
  Zap,
  Heart,
  Brain,
  Trophy,
  Globe,
  ArrowRight,
  Search,
  Filter,
  Star,
  Sparkles,
  Code,
  Palette,
  BarChart3,
  ShieldCheck,
  Accessibility,
  Target,
  Lightbulb,
  GitBranch,
  MessageSquare,
  Calendar,
  DollarSign,
  Clock,
  Building2,
  CheckCircle2,
  Inbox,
  FileText,
  PhoneCall,
  UserCheck,
  Handshake,
} from 'lucide-react';

// Animated background orbs
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAuNSAwIE0gMCA2MCBMIDAgMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIHN0eWxlPSJvcGFjaXR5OiAwLjQiIC8+PC9zdmc+')] opacity-40" />
    </div>
  );
};

// Type definitions
interface JobPosting {
  id: number;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  location: string;
  level: 'Entry' | 'Mid' | 'Senior' | 'Lead';
  salaryRange: string;
  remote: boolean;
  featured?: boolean;
  skills: string[];
  description: string;
  postedDate: string;
  applicants: number;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  bio: string;
  image: string;
  tech: string;
  yearsAtSkillWrap: number;
}

interface Testimonial {
  id: number;
  name: string;
  position: string;
  image: string;
  quote: string;
  rating: number;
  yearsAtSkillWrap: number;
}

// Sample data
const jobs: JobPosting[] = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    level: 'Senior',
    salaryRange: '$150k - $200k',
    remote: true,
    featured: true,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
    description: 'Lead frontend development for our next-generation learning platform.',
    postedDate: '2 days ago',
    applicants: 45,
  },
  {
    id: 2,
    title: 'Full Stack Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$120k - $160k',
    remote: true,
    skills: ['Node.js', 'React', 'PostgreSQL', 'AWS'],
    description: 'Build scalable features across our entire platform.',
    postedDate: '5 days ago',
    applicants: 32,
  },
  {
    id: 3,
    title: 'Backend Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    level: 'Senior',
    salaryRange: '$140k - $190k',
    remote: true,
    featured: true,
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
    description: 'Design and implement robust backend systems.',
    postedDate: '1 week ago',
    applicants: 28,
  },
  {
    id: 4,
    title: 'Mobile Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$110k - $150k',
    remote: true,
    skills: ['React Native', 'Swift', 'Kotlin', 'Firebase'],
    description: 'Create amazing mobile experiences for our users.',
    postedDate: '3 days ago',
    applicants: 22,
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    type: 'Full-time',
    location: 'Remote',
    level: 'Senior',
    salaryRange: '$130k - $180k',
    remote: true,
    skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
    description: 'Manage and optimize our cloud infrastructure.',
    postedDate: '1 week ago',
    applicants: 18,
  },
  {
    id: 6,
    title: 'AI/ML Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    level: 'Senior',
    salaryRange: '$160k - $220k',
    remote: true,
    featured: true,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'LLMs'],
    description: 'Build intelligent features powered by machine learning.',
    postedDate: '4 days ago',
    applicants: 38,
  },
  {
    id: 7,
    title: 'Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$100k - $140k',
    remote: true,
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    description: 'Shape the future of learning platform design.',
    postedDate: '6 days ago',
    applicants: 35,
  },
  {
    id: 8,
    title: 'Product Manager',
    department: 'Product',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$120k - $160k',
    remote: true,
    skills: ['Product Strategy', 'Analytics', 'Leadership', 'User Research'],
    description: 'Drive product direction and strategy.',
    postedDate: '2 weeks ago',
    applicants: 42,
  },
  {
    id: 9,
    title: 'Community Manager',
    department: 'Community',
    type: 'Full-time',
    location: 'Remote',
    level: 'Entry',
    salaryRange: '$60k - $90k',
    remote: true,
    skills: ['Community Building', 'Communication', 'Social Media', 'Engagement'],
    description: 'Build and nurture our growing community.',
    postedDate: '3 days ago',
    applicants: 28,
  },
  {
    id: 10,
    title: 'Marketing Manager',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$90k - $130k',
    remote: true,
    skills: ['Marketing Strategy', 'Analytics', 'Content', 'Growth'],
    description: 'Lead marketing initiatives and growth campaigns.',
    postedDate: '1 week ago',
    applicants: 25,
  },
  {
    id: 11,
    title: 'Data Scientist',
    department: 'Data',
    type: 'Full-time',
    location: 'Remote',
    level: 'Senior',
    salaryRange: '$140k - $190k',
    remote: true,
    skills: ['Python', 'SQL', 'Machine Learning', 'Analytics'],
    description: 'Extract insights from data to drive decisions.',
    postedDate: '5 days ago',
    applicants: 20,
  },
  {
    id: 12,
    title: 'Security Engineer',
    department: 'Security',
    type: 'Full-time',
    location: 'Remote',
    level: 'Senior',
    salaryRange: '$150k - $200k',
    remote: true,
    skills: ['Security', 'Infrastructure', 'Compliance', 'Penetration Testing'],
    description: 'Protect our platform and user data.',
    postedDate: '2 weeks ago',
    applicants: 15,
  },
  {
    id: 13,
    title: 'Technical Writer',
    department: 'Content',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$80k - $120k',
    remote: true,
    skills: ['Technical Writing', 'Documentation', 'Content', 'Markdown'],
    description: 'Create comprehensive documentation and guides.',
    postedDate: '4 days ago',
    applicants: 18,
  },
  {
    id: 14,
    title: 'Customer Success Manager',
    department: 'Success',
    type: 'Full-time',
    location: 'Remote',
    level: 'Entry',
    salaryRange: '$65k - $95k',
    remote: true,
    skills: ['Customer Success', 'Communication', 'Problem Solving', 'CRM'],
    description: 'Ensure our customers achieve their goals.',
    postedDate: '6 days ago',
    applicants: 31,
  },
  {
    id: 15,
    title: 'QA Engineer',
    department: 'Quality',
    type: 'Full-time',
    location: 'Remote',
    level: 'Mid',
    salaryRange: '$90k - $130k',
    remote: true,
    skills: ['Test Automation', 'Quality Assurance', 'JavaScript', 'Testing'],
    description: 'Ensure platform quality and reliability.',
    postedDate: '1 week ago',
    applicants: 22,
  },
];

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'CEO & Co-founder',
    department: 'Leadership',
    bio: 'Visionary leader transforming education through technology.',
    image: '👩‍💼',
    tech: 'Product Strategy',
    yearsAtSkillWrap: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    position: 'CTO & Co-founder',
    department: 'Engineering',
    bio: 'Tech visionary building scalable systems.',
    image: '👨‍💻',
    tech: 'System Architecture',
    yearsAtSkillWrap: 5,
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    position: 'VP of Design',
    department: 'Design',
    bio: 'Creating beautiful, intuitive user experiences.',
    image: '👩‍🎨',
    tech: 'Design Systems',
    yearsAtSkillWrap: 3,
  },
  {
    id: 4,
    name: 'David Park',
    position: 'Head of Engineering',
    department: 'Engineering',
    bio: 'Leading engineering excellence and innovation.',
    image: '👨‍⚙️',
    tech: 'Full Stack',
    yearsAtSkillWrap: 4,
  },
  {
    id: 5,
    name: 'Lisa Wang',
    position: 'VP of Product',
    department: 'Product',
    bio: 'Driving product vision and user-centric innovation.',
    image: '👩‍🔬',
    tech: 'Product Management',
    yearsAtSkillWrap: 3,
  },
  {
    id: 6,
    name: 'James Wilson',
    position: 'Community Lead',
    department: 'Community',
    bio: 'Building and nurturing our global community.',
    image: '👨‍🤝‍👨',
    tech: 'Community Building',
    yearsAtSkillWrap: 2,
  },
];

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Alex Thompson',
    position: 'Senior Frontend Engineer',
    image: '👨‍💼',
    quote: 'SkillWrap gave me the opportunity to grow as an engineer while contributing to something that matters.',
    rating: 5,
    yearsAtSkillWrap: 2,
  },
  {
    id: 2,
    name: 'Priya Patel',
    position: 'Product Designer',
    image: '👩‍🎨',
    quote: 'The culture here is incredible. Everyone is passionate about education and learning.',
    rating: 5,
    yearsAtSkillWrap: 1,
  },
  {
    id: 3,
    name: 'Marcus Green',
    position: 'Community Manager',
    image: '👨‍💼',
    quote: 'Working at SkillWrap means building a global community of learners and innovators every single day.',
    rating: 5,
    yearsAtSkillWrap: 1,
  },
];

const hiringSteps = [
  { icon: Inbox, title: 'Submit Application', description: 'Apply through our careers portal' },
  { icon: FileText, title: 'Resume Review', description: 'Our team reviews your application' },
  { icon: PhoneCall, title: 'Recruiter Call', description: 'Initial conversation with recruiter' },
  { icon: Code, title: 'Technical Interview', description: 'Showcase your technical skills' },
  { icon: Brain, title: 'Assessment', description: 'Hands-on technical assessment' },
  { icon: Users, title: 'Team Interview', description: 'Meet with your future team' },
  { icon: UserCheck, title: 'Final Interview', description: 'Final round with leadership' },
  { icon: Handshake, title: 'Offer', description: 'Receive your offer' },
  { icon: CheckCircle2, title: 'Onboarding', description: 'Join the SkillWrap family' },
];

const faqItems = [
  {
    question: 'Can I work remotely?',
    answer: 'Yes! We are a fully remote-first company. Our team spans across multiple time zones and countries.',
  },
  {
    question: 'Do you sponsor visas?',
    answer: 'We sponsor visas for qualified candidates. This varies by role and location, so please discuss with our recruitment team.',
  },
  {
    question: 'Do you offer internships?',
    answer: 'Absolutely! We have dedicated internship and graduate programs designed to help you launch your career.',
  },
  {
    question: 'Can I apply for multiple positions?',
    answer: 'Yes, you can apply for multiple positions if you believe you\'re a good fit for each role.',
  },
  {
    question: 'How long is the hiring process?',
    answer: 'Typically 2-4 weeks from application to offer, though this can vary by role and circumstances.',
  },
  {
    question: 'Do you hire internationally?',
    answer: 'Yes, we hire talented people from around the world. We handle all necessary compliance and tax documentation.',
  },
  {
    question: 'What technologies does SkillWrap use?',
    answer: 'We primarily use React, Node.js, TypeScript, PostgreSQL, AWS, and Python. But we value learning and growth over specific tech stacks.',
  },
  {
    question: 'What benefits do employees receive?',
    answer: 'We offer competitive salaries, health insurance, learning budgets, flexible hours, and much more. Check our benefits section for details.',
  },
  {
    question: 'How do interviews work?',
    answer: 'We use a structured interview process designed to be fair and transparent. All interviews are conducted via video call.',
  },
  {
    question: 'Can I reapply after being rejected?',
    answer: 'Yes! We encourage candidates to reapply after 6 months. Skills and circumstances change, and we\'d love to see your growth.',
  },
];

// Main component
export default function CareersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [sortBy, setSortBy] = useState('latest');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);

  const filteredJobs = useMemo(() => {
    let filtered = jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
      const matchesLocation = !selectedLocation || job.location === selectedLocation;
      const matchesLevel = !selectedLevel || job.level === selectedLevel;
      const matchesRemote = !remoteOnly || job.remote;

      return matchesSearch && matchesDepartment && matchesLocation && matchesLevel && matchesRemote;
    });

    // Sort
    if (sortBy === 'salary') {
      filtered.sort((a, b) => {
        const aMin = parseInt(a.salaryRange.split('-')[0]);
        const bMin = parseInt(b.salaryRange.split('-')[0]);
        return bMin - aMin;
      });
    } else if (sortBy === 'popular') {
      filtered.sort((a, b) => b.applicants - a.applicants);
    } else if (sortBy === 'latest') {
      // Already in order
    }

    return filtered;
  }, [searchQuery, selectedDepartment, selectedLocation, selectedLevel, remoteOnly, sortBy]);

  return (
    <div className="relative min-h-screen bg-slate-900 text-white overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/30 bg-blue-400/10 backdrop-blur-xl mb-6"
              >
                <Sparkles size={16} className="text-blue-400" />
                <span className="text-sm font-medium text-blue-200">We&apos;re Hiring Globally</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-200 via-blue-100 to-cyan-200 bg-clip-text text-transparent leading-tight"
              >
                Build the Future of Learning with SkillWrap
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-8"
              >
                We&apos;re building the next generation of learning, mentoring, collaboration, and skill-sharing. Join us in transforming education through technology and innovation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-semibold text-white transition-all duration-300 flex items-center gap-2 justify-center group">
                  View Open Roles
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border border-blue-400/50 hover:border-blue-300/80 bg-blue-400/5 hover:bg-blue-400/10 rounded-lg font-semibold text-blue-200 backdrop-blur-xl transition-all duration-300">
                  Learn About Our Culture
                </button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About SkillWrap */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              About SkillWrap
            </h2>
            <p className="text-slate-400 text-lg">
              Learn more about our mission, vision, and what drives us forward.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Our Mission',
                description:
                  'Empower learners, mentors, and creators worldwide by building technology that connects knowledge, skills, and opportunities.',
                icon: Target,
              },
              {
                title: 'Our Vision',
                description:
                  'A world where anyone can learn, teach, and grow regardless of their background or location.',
                icon: Globe,
              },
              {
                title: 'Why We Exist',
                description:
                  'Education systems are changing. We exist to bridge the gap between traditional learning and the future of work.',
                icon: Lightbulb,
              },
              {
                title: 'What Makes Us Different',
                description:
                  'We combine cutting-edge technology with human-centered design to create meaningful learning experiences.',
                icon: Sparkles,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-blue-400/20 bg-blue-400/5 backdrop-blur-xl hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300 group"
                >
                  <Icon size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-slate-300">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Company Statistics */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Impact
            </h2>
            <p className="text-slate-400 text-lg">Join a community making real impact globally.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: 'Community Members', value: '500K+' },
              { label: 'Skills Shared', value: '10K+' },
              { label: 'Mentors', value: '25K+' },
              { label: 'Learners Active', value: '100K+' },
              { label: 'Countries', value: '180+' },
              { label: 'Events Hosted', value: '1K+' },
              { label: 'Challenges Done', value: '50K+' },
              { label: 'Success Rate', value: '98%' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-blue-400/20 bg-gradient-to-br from-blue-400/10 to-cyan-400/5 backdrop-blur-xl text-center hover:border-blue-400/50 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Join SkillWrap */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Why Join SkillWrap
            </h2>
            <p className="text-slate-400 text-lg">
              Competitive benefits and a culture that values growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Flexible Remote Work', icon: Globe, description: 'Work from anywhere in the world' },
              { title: 'Competitive Salary', icon: DollarSign, description: 'Market-competitive compensation packages' },
              { title: 'Learning Budget', icon: Brain, description: '$1500/year for courses and conferences' },
              { title: 'Free Courses', icon: Code, description: 'Access to SkillWrap premium content' },
              { title: 'Mentorship Programs', icon: Users, description: 'Learn from industry experts' },
              { title: 'Stock Options', icon: Trophy, description: 'Own a piece of SkillWrap' },
              { title: 'Health & Wellness', icon: Heart, description: 'Comprehensive health coverage' },
              { title: 'Paid Time Off', icon: Calendar, description: '20+ days vacation per year' },
              { title: 'Flexible Hours', icon: Clock, description: 'Work at your peak productivity hours' },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-purple-400/20 bg-purple-400/5 backdrop-blur-xl hover:border-purple-400/50 hover:bg-purple-400/10 transition-all duration-300 group cursor-pointer"
                >
                  <Icon size={32} className="text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Core Values */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Core Values
            </h2>
            <p className="text-slate-400 text-lg">
              These principles guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: 'Innovation', emoji: '💡' },
              { name: 'Learning', emoji: '📚' },
              { name: 'Community', emoji: '🤝' },
              { name: 'Integrity', emoji: '✨' },
              { name: 'Growth', emoji: '🚀' },
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/5 backdrop-blur-xl hover:border-emerald-400/50 hover:bg-emerald-400/10 transition-all duration-300 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-2 group-hover:scale-125 transition-transform">{value.emoji}</div>
                <h3 className="text-lg font-bold">{value.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Meet Our Team */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Meet Our Team
            </h2>
            <p className="text-slate-400 text-lg">
              Talented people building the future of learning.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl border border-blue-400/20 bg-blue-400/5 backdrop-blur-xl hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-blue-400 font-semibold mb-1">{member.position}</p>
                <p className="text-slate-400 text-sm mb-3">{member.bio}</p>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{member.tech}</span>
                  <span>{member.yearsAtSkillWrap} years</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Open Positions */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Open Positions
            </h2>
            <p className="text-slate-400 text-lg">
              {filteredJobs.length} role{filteredJobs.length !== 1 ? 's' : ''} available
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex flex-col gap-4 mb-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search job titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-blue-400/10 border border-blue-400/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/60 focus:bg-blue-400/20 transition-all duration-300 backdrop-blur-xl"
                />
              </div>

              {/* Filter Chips */}
              <div className="flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRemoteOnly(!remoteOnly)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    remoteOnly
                      ? 'bg-blue-500 border border-blue-400'
                      : 'border border-slate-600 bg-slate-800/50 hover:border-blue-400'
                  }`}
                >
                  Remote Only
                </motion.button>

                {['Entry', 'Mid', 'Senior', 'Lead'].map((level) => (
                  <motion.button
                    key={level}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedLevel === level
                        ? 'bg-purple-500 border border-purple-400'
                        : 'border border-slate-600 bg-slate-800/50 hover:border-purple-400'
                    }`}
                  >
                    {level}
                  </motion.button>
                ))}
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-blue-400/10 border border-blue-400/30 rounded-lg text-white focus:outline-none focus:border-blue-400/60 backdrop-blur-xl"
                >
                  <option value="latest">Latest</option>
                  <option value="salary">Highest Salary</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Job Listings */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredJobs.map((job, i) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    expandedJobId === job.id
                      ? 'border-blue-400/60 bg-blue-400/15 backdrop-blur-xl'
                      : 'border-blue-400/20 bg-blue-400/5 hover:border-blue-400/40 hover:bg-blue-400/10'
                  }`}
                  onClick={() => setExpandedJobId(expandedJobId === job.id ? null : job.id)}
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold">{job.title}</h3>
                        {job.featured && (
                          <span className="px-2 py-1 bg-yellow-400/20 border border-yellow-400/50 rounded-full text-xs font-semibold text-yellow-300">
                            Featured
                          </span>
                        )}
                        {job.remote && (
                          <span className="px-2 py-1 bg-green-400/20 border border-green-400/50 rounded-full text-xs font-semibold text-green-300">
                            Remote
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400">{job.department}</p>
                    </div>
                    <motion.div
                      animate={{ rotate: expandedJobId === job.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={24} className="text-blue-400" />
                    </motion.div>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-4 text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                      <MapPin size={16} />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={16} />
                      {job.type}
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart3 size={16} />
                      {job.level}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign size={16} />
                      {job.salaryRange}
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedJobId === job.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-blue-400/20 pt-4 mt-4"
                      >
                        <p className="mb-4 text-slate-300">{job.description}</p>

                        <div className="mb-4">
                          <p className="text-sm font-semibold text-slate-400 mb-2">Required Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-xs font-medium text-blue-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-400 mb-4">
                          <div>
                            Posted {job.postedDate} • {job.applicants} applicants
                          </div>
                        </div>

                        <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-semibold text-white transition-all duration-300">
                          Apply Now
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredJobs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-slate-400">No positions match your filters. Try adjusting your criteria.</p>
            </motion.div>
          )}
        </section>

        {/* Hiring Process */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Our Hiring Process
            </h2>
            <p className="text-slate-400 text-lg">
              Transparent, fair, and designed to help you succeed.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-20 bottom-0 w-1 bg-gradient-to-b from-blue-500/50 to-transparent hidden md:block" />

            <div className="space-y-8">
              {hiringSteps.map((step, i) => {
                const Icon = step.icon;
                const isEven = i % 2 === 0;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className={`flex gap-6 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className="flex-1 flex justify-center md:justify-end">
                      <div className="p-6 rounded-2xl border border-blue-400/20 bg-blue-400/5 backdrop-blur-xl w-full max-w-xs hover:border-blue-400/50 hover:bg-blue-400/10 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <Icon size={24} className="text-blue-400 flex-shrink-0 mt-1" />
                          <div>
                            <h4 className="font-bold mb-1">{step.title}</h4>
                            <p className="text-slate-400 text-sm">{step.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                        className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 flex-shrink-0"
                      />
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Employee Benefits */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Employee Benefits
            </h2>
            <p className="text-slate-400 text-lg">
              We invest in our people.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Health Insurance', icon: Heart },
              { title: 'Dental Care', icon: Trophy },
              { title: 'Mental Wellness', icon: Brain },
              { title: 'Gym Membership', icon: Zap },
              { title: 'Paid Vacation', icon: Calendar },
              { title: 'Learning Budget', icon: BookOpen },
            ].map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-2xl border border-green-400/20 bg-green-400/5 backdrop-blur-xl hover:border-green-400/50 hover:bg-green-400/10 transition-all duration-300 group"
                >
                  <Icon size={32} className="text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              What Our Team Says
            </h2>
            <p className="text-slate-400 text-lg">
              Hear from people building SkillWrap.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl border border-orange-400/20 bg-orange-400/5 backdrop-blur-xl hover:border-orange-400/50 hover:bg-orange-400/10 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.position}</p>
                    <p className="text-xs text-slate-500">{testimonial.yearsAtSkillWrap} year{testimonial.yearsAtSkillWrap > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05, duration: 0.6 }}
                viewport={{ once: true }}
                className="border border-blue-400/20 rounded-2xl overflow-hidden bg-blue-400/5 backdrop-blur-xl hover:border-blue-400/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="w-full p-6 flex items-center justify-between hover:bg-blue-400/10 transition-colors duration-300"
                >
                  <h3 className="font-bold text-left">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: openFaqIndex === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-blue-400 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaqIndex === i && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-blue-400/20 px-6 py-4"
                    >
                      <p className="text-slate-300">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl border border-gradient-to-r from-blue-400/40 to-cyan-400/40 bg-gradient-to-r from-blue-400/10 to-cyan-400/5 backdrop-blur-xl"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
              Ready to Build the Future with SkillWrap?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join our mission to transform education globally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg font-semibold text-white transition-all duration-300 flex items-center gap-2 justify-center group">
                Apply Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-blue-400/50 hover:border-blue-300/80 bg-blue-400/5 hover:bg-blue-400/10 rounded-lg font-semibold text-blue-200 backdrop-blur-xl transition-all duration-300">
                Explore Open Roles
              </button>
            </div>
          </motion.div>
        </section>

        {/* Footer Banner */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 border-t border-blue-400/20 mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-3">Thank You for Considering SkillWrap</h3>
            <p className="text-slate-400 mb-6">
              Whether you&apos;re ready to join us now or exploring future opportunities, we&apos;d love to stay connected.
            </p>
            <button className="px-6 py-2 border border-blue-400/30 rounded-full text-sm font-medium text-blue-200 hover:border-blue-400/60 hover:bg-blue-400/10 transition-all duration-300">
              Stay Updated
            </button>
          </motion.div>
        </section>
      </div>
    </div>
  );
}

// Fix for missing BookOpen import
const BookOpen = ({ size, className }: { size: number; className: string }) => (
  <Code size={size} className={className} />
);



// "use client";

// import { useState, useMemo } from "react";
// import { motion } from "framer-motion";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   Clock,
//   Users,
//   Heart,
//   GraduationCap,
//   Laptop,
//   Brain,
//   Lightbulb,
//   Target,
//   Rocket,
//   Globe,
//   Award,
//   BookOpen,
//   Shield,
//   MessageCircle,
//   Sparkles,
//   Send,
//   Check,
//   ChevronRight,
//   Building2,
//   DollarSign,
//   Filter,
//   X,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";

// // Types
// interface Job {
//   id: string;
//   title: string;
//   department: string;
//   employmentType: "Full-time" | "Part-time" | "Internship" | "Contract";
//   location: "Remote" | "Hybrid" | "On-site";
//   experienceLevel: "Entry" | "Mid" | "Senior" | "Lead" | "Executive";
//   salaryRange?: string;
//   description: string;
//   skills: string[];
// }

// // Job data
// const jobs: Job[] = [
//   {
//     id: "1",
//     title: "Frontend Developer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Mid",
//     salaryRange: "$90K - $130K",
//     description: "Build beautiful, responsive user interfaces that power the SkillWrap learning experience.",
//     skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
//   },
//   {
//     id: "2",
//     title: "Backend Developer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Senior",
//     salaryRange: "$120K - $160K",
//     description: "Design and implement scalable APIs and services that support millions of learners worldwide.",
//     skills: ["Node.js", "Python", "PostgreSQL", "AWS"],
//   },
//   {
//     id: "3",
//     title: "Full Stack Developer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     location: "Hybrid",
//     experienceLevel: "Mid",
//     salaryRange: "$100K - $140K",
//     description: "Own end-to-end features from database to UI, creating seamless learning experiences.",
//     skills: ["React", "Node.js", "PostgreSQL", "GraphQL"],
//   },
//   {
//     id: "4",
//     title: "Mobile App Developer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Mid",
//     salaryRange: "$95K - $135K",
//     description: "Build native mobile experiences that bring SkillWrap to learners on the go.",
//     skills: ["React Native", "Swift", "Kotlin", "Firebase"],
//   },
//   {
//     id: "5",
//     title: "UI/UX Designer",
//     department: "Design",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Mid",
//     salaryRange: "$85K - $120K",
//     description: "Create intuitive, beautiful interfaces that make learning a delightful experience.",
//     skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
//   },
//   {
//     id: "6",
//     title: "Product Designer",
//     department: "Design",
//     employmentType: "Full-time",
//     location: "Hybrid",
//     experienceLevel: "Senior",
//     salaryRange: "$110K - $150K",
//     description: "Lead product design initiatives from concept to launch, shaping the future of learning.",
//     skills: ["Figma", "Design Thinking", "User Testing", "Strategy"],
//   },
//   {
//     id: "7",
//     title: "DevOps Engineer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Senior",
//     salaryRange: "$130K - $170K",
//     description: "Build and maintain the infrastructure that powers SkillWrap's global platform.",
//     skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
//   },
//   {
//     id: "8",
//     title: "AI Engineer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Senior",
//     salaryRange: "$140K - $180K",
//     description: "Develop AI-powered features that personalize learning for millions of users.",
//     skills: ["Python", "TensorFlow", "PyTorch", "LLMs"],
//   },
//   {
//     id: "9",
//     title: "Community Manager",
//     department: "Community",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Entry",
//     salaryRange: "$55K - $75K",
//     description: "Build and nurture a thriving community of learners, mentors, and creators.",
//     skills: ["Community Building", "Social Media", "Events", "Communication"],
//   },
//   {
//     id: "10",
//     title: "Marketing Specialist",
//     department: "Marketing",
//     employmentType: "Full-time",
//     location: "Hybrid",
//     experienceLevel: "Mid",
//     salaryRange: "$70K - $100K",
//     description: "Drive growth through innovative marketing campaigns that reach learners globally.",
//     skills: ["SEO", "Content Marketing", "Analytics", "Campaigns"],
//   },
//   {
//     id: "11",
//     title: "Content Creator",
//     department: "Content",
//     employmentType: "Part-time",
//     location: "Remote",
//     experienceLevel: "Entry",
//     salaryRange: "$40K - $60K",
//     description: "Create engaging educational content that inspires and educates our community.",
//     skills: ["Video editing", "Writing", "Storytelling", "Education"],
//   },
//   {
//     id: "12",
//     title: "Technical Writer",
//     department: "Content",
//     employmentType: "Contract",
//     location: "Remote",
//     experienceLevel: "Mid",
//     salaryRange: "$60K - $85K",
//     description: "Document our platform and create tutorials that help users succeed.",
//     skills: ["Technical Writing", "Documentation", "Markdown", "APIs"],
//   },
//   {
//     id: "13",
//     title: "Customer Support Specialist",
//     department: "Support",
//     employmentType: "Full-time",
//     location: "Remote",
//     experienceLevel: "Entry",
//     salaryRange: "$45K - $65K",
//     description: "Provide exceptional support that helps learners overcome challenges.",
//     skills: ["Customer Service", "Problem Solving", "Empathy", "Communication"],
//   },
//   {
//     id: "14",
//     title: "Product Manager",
//     department: "Product",
//     employmentType: "Full-time",
//     location: "Hybrid",
//     experienceLevel: "Senior",
//     salaryRange: "$130K - $170K",
//     description: "Define product strategy and roadmap for features that impact millions of learners.",
//     skills: ["Product Strategy", "Analytics", "Roadmapping", "Leadership"],
//   },
// ];

// const departments = Array.from(new Set(jobs.map((j) => j.department)));
// const locations = Array.from(new Set(jobs.map((j) => j.location)));
// const employmentTypes = Array.from(new Set(jobs.map((j) => j.employmentType)));
// const experienceLevels = ["Entry", "Mid", "Senior", "Lead", "Executive"];

// // Animation variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 },
// };

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// // Hero Section
// function HeroSection() {
//   return (
//     <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
//       {/* Background effects */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
//       <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

//       {/* Animated gradient orbs */}
//       <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" />
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
//       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[150px]" />

//       <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//         >
//           <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20 transition-all">
//             <Sparkles className="w-3 h-3 mr-1" />
//             We're hiring across all departments
//           </Badge>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.1 }}
//           className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight"
//         >
//           <span className="text-white">Build the Future of</span>
//           <br />
//           <span className="gradient-text text-glow">Learning with SkillWrap</span>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed"
//         >
//           Join a team of passionate innovators dedicated to transforming education
//           and empowering learners, mentors, and creators worldwide.
//         </motion.p>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.3 }}
//           className="flex flex-col sm:flex-row gap-4 justify-center"
//         >
//           <Button
//             size="lg"
//             className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl glow transition-all hover:scale-105"
//             onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             View Open Positions
//             <ChevronRight className="ml-2 w-5 h-5" />
//           </Button>
//           <Button
//             size="lg"
//             variant="outline"
//             className="border-slate-700 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl transition-all"
//             onClick={() => document.getElementById('culture')?.scrollIntoView({ behavior: 'smooth' })}
//           >
//             Our Culture
//           </Button>
//         </motion.div>

//         {/* Floating stats */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//           className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
//         >
//           {[
//             { value: "50+", label: "Team Members" },
//             { value: "30+", label: "Countries" },
//             { value: "2M+", label: "Learners" },
//             { value: "96%", label: "Employee Satisfaction" },
//           ].map((stat, i) => (
//             <div key={i} className="text-center">
//               <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
//               <div className="text-slate-500 text-sm">{stat.label}</div>
//             </div>
//           ))}
//         </motion.div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-10 left-1/2 -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center pt-2"
//         >
//           <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

// // Why Work With Us Section
// function WhyWorkWithUs() {
//   const benefits = [
//     { icon: Globe, title: "Flexible Remote Work", description: "Work from anywhere in the world with flexible hours that suit your lifestyle." },
//     { icon: DollarSign, title: "Competitive Salary", description: "Industry-leading compensation with equity packages and performance bonuses." },
//     { icon: Rocket, title: "Career Growth", description: "Clear career paths with mentorship, leadership training, and promotion opportunities." },
//     { icon: BookOpen, title: "Learning Budget", description: "$5,000 annual budget for courses, conferences, and professional development." },
//     { icon: Heart, title: "Health & Wellness", description: "Comprehensive health, dental, and vision insurance plus mental health support." },
//     { icon: Users, title: "Mentorship Program", description: "Learn from industry experts through our structured mentorship initiatives." },
//     { icon: MessageCircle, title: "Collaborative Team", description: "Work alongside talented, supportive colleagues who value teamwork." },
//     { icon: Laptop, title: "Modern Tools", description: "Top-tier equipment and cutting-edge software to do your best work." },
//   ];

//   return (
//     <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-16"
//         >
//           <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">Why SkillWrap</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Why Work With Us
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             We believe great work happens when people are supported, valued, and empowered to grow.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {benefits.map((benefit, i) => (
//             <motion.div
//               key={i}
//               variants={fadeInUp}
//               className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:glow-sm"
//             >
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all">
//                 <benefit.icon className="w-6 h-6 text-cyan-400" />
//               </div>
//               <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
//               <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // Company Values Section
// function CompanyValues() {
//   const values = [
//     {
//       icon: Target,
//       title: "Mission-Driven",
//       description: "Every decision we make is guided by our mission to democratize education and empower learners worldwide.",
//       gradient: "from-rose-500 to-orange-500",
//     },
//     {
//       icon: Lightbulb,
//       title: "Innovation First",
//       description: "We embrace experimentation, celebrate creative solutions, and push the boundaries of what's possible.",
//       gradient: "from-amber-500 to-yellow-500",
//     },
//     {
//       icon: Heart,
//       title: "People-Centered",
//       description: "We prioritize the wellbeing and growth of our team, our users, and our global community.",
//       gradient: "from-emerald-500 to-teal-500",
//     },
//     {
//       icon: Shield,
//       title: "Trust & Integrity",
//       description: "We build trust through transparency, honest communication, and keeping our commitments.",
//       gradient: "from-cyan-500 to-blue-500",
//     },
//   ];

//   return (
//     <section className="py-24 bg-slate-900 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-blue-500/5" />

//       <div className="max-w-7xl mx-auto px-6 relative">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-16"
//         >
//           <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Our Values</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             What We Stand For
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             Our values define who we are and guide everything we do at SkillWrap.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="grid grid-cols-1 md:grid-cols-2 gap-8"
//         >
//           {values.map((value, i) => (
//             <motion.div
//               key={i}
//               variants={fadeInUp}
//               className="group relative p-8 rounded-2xl bg-slate-800/30 border border-slate-700/30 overflow-hidden"
//             >
//               <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-all`} />

//               <div className="relative">
//                 <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6`}>
//                   <value.icon className="w-7 h-7 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
//                 <p className="text-slate-400 leading-relaxed">{value.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // Job Card Component
// function JobCard({ job }: { job: Job }) {
//   const [isApplyOpen, setIsApplyOpen] = useState(false);

//   const departmentColors: Record<string, string> = {
//     Engineering: "bg-blue-500/10 text-blue-400 border-blue-500/20",
//     Design: "bg-purple-500/10 text-purple-400 border-purple-500/20",
//     Marketing: "bg-rose-500/10 text-rose-400 border-rose-500/20",
//     Community: "bg-amber-500/10 text-amber-400 border-amber-500/20",
//     Content: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
//     Support: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
//     Product: "bg-teal-500/10 text-teal-400 border-teal-500/20",
//   };

//   return (
//     <>
//       <motion.div
//         variants={fadeInUp}
//         className="group relative p-6 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:glow-sm"
//       >
//         <div className="flex flex-col lg:flex-row lg:items-center gap-4">
//           <div className="flex-1">
//             <div className="flex flex-wrap items-center gap-2 mb-3">
//               <Badge className={departmentColors[job.department] || "bg-slate-500/10 text-slate-400 border-slate-500/20"}>
//                 {job.department}
//               </Badge>
//               <Badge variant="outline" className="border-slate-600 text-slate-400">
//                 {job.employmentType}
//               </Badge>
//               <Badge variant="outline" className="border-slate-600 text-slate-400">
//                 <MapPin className="w-3 h-3 mr-1" />
//                 {job.location}
//               </Badge>
//             </div>

//             <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
//               {job.title}
//             </h3>

//             <p className="text-slate-400 text-sm mb-4 line-clamp-2">{job.description}</p>

//             <div className="flex flex-wrap gap-2 mb-4">
//               {job.skills.slice(0, 4).map((skill, i) => (
//                 <span key={i} className="px-2 py-1 text-xs rounded-md bg-slate-700/50 text-slate-300">
//                   {skill}
//                 </span>
//               ))}
//             </div>

//             <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
//               <span className="flex items-center gap-1">
//                 <Briefcase className="w-4 h-4" />
//                 {job.experienceLevel} Level
//               </span>
//               {job.salaryRange && (
//                 <span className="flex items-center gap-1">
//                   <DollarSign className="w-4 h-4" />
//                   {job.salaryRange}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
//             <Dialog>
//               <DialogTrigger asChild>
//                 <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
//                   View Details
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
//                 <DialogHeader>
//                   <DialogTitle className="text-2xl text-white">{job.title}</DialogTitle>
//                   <DialogDescription className="text-slate-400 text-base pt-2">
//                     {job.description}
//                   </DialogDescription>
//                 </DialogHeader>
//                 <div className="mt-4 space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="p-4 rounded-lg bg-slate-800">
//                       <p className="text-slate-500 text-sm">Department</p>
//                       <p className="text-white font-medium">{job.department}</p>
//                     </div>
//                     <div className="p-4 rounded-lg bg-slate-800">
//                       <p className="text-slate-500 text-sm">Employment Type</p>
//                       <p className="text-white font-medium">{job.employmentType}</p>
//                     </div>
//                     <div className="p-4 rounded-lg bg-slate-800">
//                       <p className="text-slate-500 text-sm">Location</p>
//                       <p className="text-white font-medium">{job.location}</p>
//                     </div>
//                     <div className="p-4 rounded-lg bg-slate-800">
//                       <p className="text-slate-500 text-sm">Experience</p>
//                       <p className="text-white font-medium">{job.experienceLevel} Level</p>
//                     </div>
//                   </div>
//                   {job.salaryRange && (
//                     <div className="p-4 rounded-lg bg-slate-800">
//                       <p className="text-slate-500 text-sm">Salary Range</p>
//                       <p className="text-white font-medium">{job.salaryRange}</p>
//                     </div>
//                   )}
//                   <div>
//                     <p className="text-slate-500 text-sm mb-2">Required Skills</p>
//                     <div className="flex flex-wrap gap-2">
//                       {job.skills.map((skill, i) => (
//                         <Badge key={i} className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="mt-6 flex justify-end gap-3">
//                   <Button variant="outline" className="border-slate-600 text-slate-300">Close</Button>
//                   <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white" onClick={() => setIsApplyOpen(true)}>
//                     Apply Now
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>

//             <Button
//               className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
//               onClick={() => setIsApplyOpen(true)}
//             >
//               Apply Now
//             </Button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Apply Modal */}
//       <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
//         <DialogContent className="max-w-lg bg-slate-900 border-slate-700">
//           <DialogHeader>
//             <DialogTitle className="text-xl text-white">Apply for {job.title}</DialogTitle>
//             <DialogDescription className="text-slate-400">
//               Submit your application to join the SkillWrap team.
//             </DialogDescription>
//           </DialogHeader>
//           <form className="space-y-4 mt-4">
//             <div>
//               <Label htmlFor="name" className="text-slate-300">Full Name</Label>
//               <Input id="name" placeholder="John Doe" className="mt-1 bg-slate-800 border-slate-600 text-white" />
//             </div>
//             <div>
//               <Label htmlFor="email" className="text-slate-300">Email</Label>
//               <Input id="email" type="email" placeholder="john@example.com" className="mt-1 bg-slate-800 border-slate-600 text-white" />
//             </div>
//             <div>
//               <Label htmlFor="portfolio" className="text-slate-300">Portfolio / LinkedIn</Label>
//               <Input id="portfolio" placeholder="https://..." className="mt-1 bg-slate-800 border-slate-600 text-white" />
//             </div>
//             <div>
//               <Label htmlFor="message" className="text-slate-300">Why do you want to join?</Label>
//               <Textarea id="message" placeholder="Tell us about yourself..." className="mt-1 bg-slate-800 border-slate-600 text-white min-h-[100px]" />
//             </div>
//             <div className="flex justify-end gap-3 pt-2">
//               <Button type="button" variant="outline" className="border-slate-600 text-slate-300" onClick={() => setIsApplyOpen(false)}>Cancel</Button>
//               <Button type="submit" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
//                 <Send className="w-4 h-4 mr-2" />
//                 Submit Application
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// // Open Positions Section
// function OpenPositions() {
//   const [search, setSearch] = useState("");
//   const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
//   const [selectedLocation, setSelectedLocation] = useState<string>("all");
//   const [selectedType, setSelectedType] = useState<string>("all");
//   const [selectedExperience, setSelectedExperience] = useState<string>("all");
//   const [showFilters, setShowFilters] = useState(false);

//   const filteredJobs = useMemo(() => {
//     return jobs.filter((job) => {
//       const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
//         job.department.toLowerCase().includes(search.toLowerCase()) ||
//         job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));
//       const matchesDepartment = selectedDepartment === "all" || job.department === selectedDepartment;
//       const matchesLocation = selectedLocation === "all" || job.location === selectedLocation;
//       const matchesType = selectedType === "all" || job.employmentType === selectedType;
//       const matchesExperience = selectedExperience === "all" || job.experienceLevel === selectedExperience;

//       return matchesSearch && matchesDepartment && matchesLocation && matchesType && matchesExperience;
//     });
//   }, [search, selectedDepartment, selectedLocation, selectedType, selectedExperience]);

//   const clearFilters = () => {
//     setSearch("");
//     setSelectedDepartment("all");
//     setSelectedLocation("all");
//     setSelectedType("all");
//     setSelectedExperience("all");
//   };

//   const hasActiveFilters = search || selectedDepartment !== "all" || selectedLocation !== "all" || selectedType !== "all" || selectedExperience !== "all";

//   return (
//     <section id="positions" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-12"
//         >
//           <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Join Our Team</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Open Positions
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             Find your perfect role and help us shape the future of learning.
//           </p>
//         </motion.div>

//         {/* Search and Filters */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-8 space-y-4"
//         >
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
//               <Input
//                 placeholder="Search by role, department, or skill..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="pl-12 h-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
//               />
//             </div>
//             <Button
//               variant="outline"
//               className={`h-12 px-4 border-slate-700 ${showFilters ? "bg-slate-800" : "bg-slate-800/50"} text-slate-300`}
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <Filter className="w-4 h-4 mr-2" />
//               Filters
//               {hasActiveFilters && (
//                 <Badge className="ml-2 bg-cyan-500 text-white text-xs px-1.5 py-0.5 rounded-full">
//                   {[selectedDepartment !== "all", selectedLocation !== "all", selectedType !== "all", selectedExperience !== "all", search].filter(Boolean).length}
//                 </Badge>
//               )}
//             </Button>
//           </div>

//           {showFilters && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50"
//             >
//               <div>
//                 <Label className="text-slate-400 text-sm mb-1.5 block">Department</Label>
//                 <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
//                   <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
//                     <SelectValue placeholder="All Departments" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-800 border-slate-700">
//                     <SelectItem value="all" className="text-slate-300">All Departments</SelectItem>
//                     {departments.map((d) => (
//                       <SelectItem key={d} value={d} className="text-slate-300">{d}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label className="text-slate-400 text-sm mb-1.5 block">Location</Label>
//                 <Select value={selectedLocation} onValueChange={setSelectedLocation}>
//                   <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
//                     <SelectValue placeholder="All Locations" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-800 border-slate-700">
//                     <SelectItem value="all" className="text-slate-300">All Locations</SelectItem>
//                     {locations.map((l) => (
//                       <SelectItem key={l} value={l} className="text-slate-300">{l}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label className="text-slate-400 text-sm mb-1.5 block">Employment Type</Label>
//                 <Select value={selectedType} onValueChange={setSelectedType}>
//                   <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
//                     <SelectValue placeholder="All Types" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-800 border-slate-700">
//                     <SelectItem value="all" className="text-slate-300">All Types</SelectItem>
//                     {employmentTypes.map((t) => (
//                       <SelectItem key={t} value={t} className="text-slate-300">{t}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label className="text-slate-400 text-sm mb-1.5 block">Experience Level</Label>
//                 <Select value={selectedExperience} onValueChange={setSelectedExperience}>
//                   <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
//                     <SelectValue placeholder="All Levels" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-slate-800 border-slate-700">
//                     <SelectItem value="all" className="text-slate-300">All Levels</SelectItem>
//                     {experienceLevels.map((e) => (
//                       <SelectItem key={e} value={e} className="text-slate-300">{e}</SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="flex items-end">
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={clearFilters}
//                   className="text-slate-400 hover:text-white"
//                 >
//                   <X className="w-4 h-4 mr-1" />
//                   Clear Filters
//                 </Button>
//               </div>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Job count */}
//         <div className="text-slate-400 text-sm mb-6">
//           Showing {filteredJobs.length} of {jobs.length} positions
//         </div>

//         {/* Job listings */}
//         {filteredJobs.length > 0 ? (
//           <motion.div
//             initial="initial"
//             whileInView="animate"
//             viewport={{ once: true }}
//             variants={staggerContainer}
//             className="space-y-4"
//           >
//             {filteredJobs.map((job) => (
//               <JobCard key={job.id} job={job} />
//             ))}
//           </motion.div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center py-16"
//           >
//             <div className="w-20 h-20 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-6">
//               <Search className="w-10 h-10 text-slate-500" />
//             </div>
//             <h3 className="text-xl font-semibold text-white mb-2">No positions found</h3>
//             <p className="text-slate-400 mb-6 max-w-md mx-auto">
//               We don't have any positions matching your criteria right now, but we're always looking for talented individuals.
//             </p>
//             <Button
//               className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
//               onClick={clearFilters}
//             >
//               Clear Filters
//             </Button>
//           </motion.div>
//         )}
//       </div>
//     </section>
//   );
// }

// // Application Process Timeline
// function ApplicationProcess() {
//   const steps = [
//     { step: 1, title: "Submit Application", description: "Apply online with your resume and cover letter", icon: Send },
//     { step: 2, title: "Resume Review", description: "Our team reviews your application within 5 business days", icon: Search },
//     { step: 3, title: "Initial Interview", description: "A 30-minute call to discuss your background and interests", icon: MessageCircle },
//     { step: 4, title: "Technical Assessment", description: "Role-specific challenges to showcase your skills", icon: Brain },
//     { step: 5, title: "Final Interview", description: "Meet with team members and leadership", icon: Users },
//     { step: 6, title: "Offer & Onboarding", description: "Welcome to the SkillWrap team!", icon: Rocket },
//   ];

//   return (
//     <section className="py-24 bg-slate-950 relative overflow-hidden">
//       <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />

//       <div className="max-w-7xl mx-auto px-6 relative">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-16"
//         >
//           <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">How It Works</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Application Process
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             Our hiring process is designed to be transparent, respectful, and efficient.
//           </p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {steps.map((item, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="relative group"
//             >
//               <div className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/20 transition-all h-full">
//                 <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
//                   {item.step}
//                 </div>
//                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-4 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all">
//                   <item.icon className="w-6 h-6 text-cyan-400" />
//                 </div>
//                 <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
//                 <p className="text-slate-400 text-sm">{item.description}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // Employee Benefits Section
// function EmployeeBenefits() {
//   const benefits = [
//     { icon: Brain, title: "Learning Budget", description: "$5,000/year for courses, books, and conferences" },
//     { icon: Heart, title: "Health Insurance", description: "Comprehensive medical, dental, and vision coverage" },
//     { icon: Clock, title: "Unlimited PTO", description: "Take the time you need to rest and recharge" },
//     { icon: Globe, title: "Remote Work", description: "Work from anywhere with flexible hours" },
//     { icon: GraduationCap, title: "Education Stipend", description: "Support for continued education and certifications" },
//     { icon: Award, title: "Equity Package", description: "Share in SkillWrap's success with stock options" },
//     { icon: Users, title: "Team Events", description: "Regular team retreats and virtual gatherings" },
//     { icon: Laptop, title: "Home Office Setup", description: "$2,000 budget for your perfect workspace" },
//     { icon: Shield, title: "Mental Health Support", description: "Access to counseling and wellness programs" },
//     { icon: Sparkles, title: "Wellness Stipend", description: "$1,000/year for gym, fitness apps, or wellness activities" },
//     { icon: Rocket, title: "Growth Opportunities", description: "Clear career paths and internal mobility" },
//     { icon: MessageCircle, title: "Parental Leave", description: "Generous paid leave for new parents" },
//   ];

//   return (
//     <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
//       <div className="max-w-7xl mx-auto px-6">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-16"
//         >
//           <Badge className="mb-4 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">Perks & Benefits</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Employee Benefits
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             We invest in our people because our people are our greatest asset.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//         >
//           {benefits.map((benefit, i) => (
//             <motion.div
//               key={i}
//               variants={fadeInUp}
//               className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/20 transition-all group"
//             >
//               <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-3 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 transition-all">
//                 <benefit.icon className="w-5 h-5 text-cyan-400" />
//               </div>
//               <h3 className="text-white font-medium mb-1">{benefit.title}</h3>
//               <p className="text-slate-400 text-sm">{benefit.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // Our Culture Section
// function OurCulture() {
//   const cultureItems = [
//     {
//       icon: Users,
//       title: "Collaboration",
//       description: "We believe the best ideas emerge when diverse minds work together. Cross-functional collaboration is at the heart of how we build.",
//       gradient: "from-blue-500 to-cyan-500",
//     },
//     {
//       icon: Lightbulb,
//       title: "Innovation",
//       description: "We encourage experimentation and aren't afraid to challenge the status quo. Every team member can contribute ideas that shape our product.",
//       gradient: "from-amber-500 to-orange-500",
//     },
//     {
//       icon: Globe,
//       title: "Diversity & Inclusion",
//       description: "We celebrate differences and create an environment where everyone feels welcome. Our global team brings perspectives from 30+ countries.",
//       gradient: "from-emerald-500 to-teal-500",
//     },
//     {
//       icon: BookOpen,
//       title: "Continuous Learning",
//       description: "As an education company, we practice what we preach. Learning is embedded in our DNA, from daily skill shares to quarterly conferences.",
//       gradient: "from-purple-500 to-pink-500",
//     },
//     {
//       icon: Target,
//       title: "Community Impact",
//       description: "We measure success not just by metrics, but by the positive impact we have on learners, educators, and communities worldwide.",
//       gradient: "from-rose-500 to-red-500",
//     },
//   ];

//   return (
//     <section id="culture" className="py-24 bg-slate-900 relative overflow-hidden">
//       <div className="absolute inset-0 bg-gradient-to-l from-cyan-500/5 via-transparent to-blue-500/5" />

//       <div className="max-w-7xl mx-auto px-6 relative">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-16"
//         >
//           <Badge className="mb-4 bg-teal-500/10 text-teal-400 border-teal-500/20">Our Culture</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Life at SkillWrap
//           </h2>
//           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
//             We've built a culture that celebrates curiosity, embraces change, and empowers every individual.
//           </p>
//         </motion.div>

//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//         >
//           {cultureItems.map((item, i) => (
//             <motion.div
//               key={i}
//               variants={fadeInUp}
//               className="group relative p-6 rounded-2xl bg-slate-800/30 border border-slate-700/30 hover:border-cyan-500/20 transition-all overflow-hidden"
//             >
//               <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} opacity-10 blur-xl group-hover:opacity-20 transition-all`} />

//               <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
//                 <item.icon className="w-6 h-6 text-white" />
//               </div>
//               <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
//               <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // CTA Section
// function CTASection() {
//   const [isSubmitOpen, setIsSubmitOpen] = useState(false);

//   return (
//     <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]" />
//         <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse-slow" />
//         <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
//       </div>

//       <div className="max-w-4xl mx-auto px-6 text-center relative">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <Badge className="mb-6 bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
//             <Sparkles className="w-3 h-3 mr-1" />
//             Join Our Mission
//           </Badge>

//           <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
//             Ready to Shape the Future of Education?
//           </h2>

//           <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
//             Join a team of passionate innovators building technology that empowers millions of learners worldwide. Your next adventure starts here.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button
//               size="lg"
//               className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-6 text-lg rounded-xl glow transition-all hover:scale-105"
//               onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}
//             >
//               View Open Positions
//               <ChevronRight className="ml-2 w-5 h-5" />
//             </Button>
//             <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
//               <DialogTrigger asChild>
//                 <Button
//                   size="lg"
//                   variant="outline"
//                   className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-6 text-lg rounded-xl transition-all"
//                 >
//                   Submit Your Resume
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="max-w-lg bg-slate-900 border-slate-700">
//                 <DialogHeader>
//                   <DialogTitle className="text-xl text-white">Submit Your Resume</DialogTitle>
//                   <DialogDescription className="text-slate-400">
//                     Don't see a perfect fit? We're always looking for talented individuals. Submit your resume for future opportunities.
//                   </DialogDescription>
//                 </DialogHeader>
//                 <form className="space-y-4 mt-4">
//                   <div>
//                     <Label htmlFor="general-name" className="text-slate-300">Full Name</Label>
//                     <Input id="general-name" placeholder="John Doe" className="mt-1 bg-slate-800 border-slate-600 text-white" />
//                   </div>
//                   <div>
//                     <Label htmlFor="general-email" className="text-slate-300">Email</Label>
//                     <Input id="general-email" type="email" placeholder="john@example.com" className="mt-1 bg-slate-800 border-slate-600 text-white" />
//                   </div>
//                   <div>
//                     <Label htmlFor="general-area" className="text-slate-300">Area of Interest</Label>
//                     <Select>
//                       <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
//                         <SelectValue placeholder="Select area..." />
//                       </SelectTrigger>
//                       <SelectContent className="bg-slate-800 border-slate-700">
//                         <SelectItem value="engineering" className="text-slate-300">Engineering</SelectItem>
//                         <SelectItem value="design" className="text-slate-300">Design</SelectItem>
//                         <SelectItem value="product" className="text-slate-300">Product</SelectItem>
//                         <SelectItem value="marketing" className="text-slate-300">Marketing</SelectItem>
//                         <SelectItem value="community" className="text-slate-300">Community</SelectItem>
//                         <SelectItem value="other" className="text-slate-300">Other</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                   <div>
//                     <Label htmlFor="general-portfolio" className="text-slate-300">Portfolio / LinkedIn (Optional)</Label>
//                     <Input id="general-portfolio" placeholder="https://..." className="mt-1 bg-slate-800 border-slate-600 text-white" />
//                   </div>
//                   <div>
//                     <Label htmlFor="general-message" className="text-slate-300">Tell us about yourself</Label>
//                     <Textarea id="general-message" placeholder="What interests you about SkillWrap?" className="mt-1 bg-slate-800 border-slate-600 text-white min-h-[100px]" />
//                   </div>
//                   <div className="flex justify-end gap-3 pt-2">
//                     <Button type="button" variant="outline" className="border-slate-600 text-slate-300" onClick={() => setIsSubmitOpen(false)}>Cancel</Button>
//                     <Button type="submit" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
//                       <Send className="w-4 h-4 mr-2" />
//                       Submit Resume
//                     </Button>
//                   </div>
//                 </form>
//               </DialogContent>
//             </Dialog>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // FAQ Section
// function FAQSection() {
//   const faqs = [
//     {
//       question: "Can I work remotely?",
//       answer: "Yes! SkillWrap is a remote-first company. Most of our positions are fully remote, and we provide a $2,000 home office setup budget plus a monthly stipend for internet and coworking space if needed. For hybrid roles, we have offices in major cities but still offer flexibility.",
//     },
//     {
//       question: "Do you offer internships?",
//       answer: "Absolutely! We run internship programs throughout the year for students and career changers. Our internships are paid, typically 12 weeks long, and include mentorship from experienced team members. Check our Open Positions for current internship opportunities.",
//     },
//     {
//       question: "What is the hiring process like?",
//       answer: "Our process typically takes 2-3 weeks. It starts with a resume review, followed by an initial video call, then a technical assessment or take-home project relevant to the role. Successful candidates then have final interviews with team members and leadership. We provide feedback at every stage.",
//     },
//     {
//       question: "Can I apply for multiple positions?",
//       answer: "Yes, you can apply for multiple roles if you believe you're a good fit. However, we recommend focusing on the role that aligns best with your skills and interests. Our recruiting team can also help match you with the most suitable opportunity during the interview process.",
//     },
//     {
//       question: "How long does the recruitment process take?",
//       answer: "From application to decision, our process typically takes 2-4 weeks depending on the role and number of applicants. We aim to provide updates within 5 business days of each stage. If you have an outstanding offer deadline, let us know and we'll do our best to accommodate.",
//     },
//     {
//       question: "What time zones does SkillWrap work across?",
//       answer: "Our team spans 30+ countries across all major time zones. We design our collaboration asynchronously by default, with some synchronous meetings during overlapping hours. You'll have the flexibility to work hours that suit your location and lifestyle.",
//     },
//   ];

//   return (
//     <section className="py-24 bg-slate-950">
//       <div className="max-w-3xl mx-auto px-6">
//         <motion.div
//           initial="initial"
//           whileInView="animate"
//           viewport={{ once: true }}
//           variants={staggerContainer}
//           className="text-center mb-12"
//         >
//           <Badge className="mb-4 bg-blue-500/10 text-blue-400 border-blue-500/20">Questions?</Badge>
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-slate-400 text-lg">
//             Find answers to common questions about working at SkillWrap.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//         >
//           <Accordion type="single" collapsible className="space-y-4">
//             {faqs.map((faq, i) => (
//               <AccordionItem
//                 key={i}
//                 value={`item-${i}`}
//                 className="bg-slate-800/30 border border-slate-700/30 rounded-xl px-6 data-[state=open]:border-cyan-500/20 transition-colors"
//               >
//                 <AccordionTrigger className="text-white hover:text-cyan-400 text-left py-5">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="text-slate-400 pb-5 leading-relaxed">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // Footer
// function Footer() {
//   return (
//     <footer className="py-12 bg-slate-950 border-t border-slate-800">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <div className="flex items-center justify-center gap-2 mb-4">
//           <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
//             <GraduationCap className="w-5 h-5 text-white" />
//           </div>
//           <span className="text-xl font-bold text-white">SkillWrap</span>
//         </div>
//         <p className="text-slate-500 text-sm mb-6">
//           Empowering learners, mentors, and creators worldwide.
//         </p>
//         <div className="flex justify-center gap-6 text-slate-400 text-sm">
//           <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
//           <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
//           <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
//         </div>
//         <p className="mt-8 text-slate-600 text-xs">
//           © 2024 SkillWrap. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// // Main Careers Page
// export default function CareersPage() {
//   return (
//     <main className="bg-slate-950 text-white min-h-screen overflow-x-hidden">
//       <HeroSection />
//       <WhyWorkWithUs />
//       <CompanyValues />
//       <OpenPositions />
//       <ApplicationProcess />
//       <EmployeeBenefits />
//       <OurCulture />
//       <CTASection />
//       <FAQSection />
//       <Footer />
//     </main>
//   );
// }
