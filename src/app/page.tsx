"use client"

import { useState } from 'react'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { SparklesCore } from "@/components/ui/sparkles"
import { motion } from "framer-motion";

const features = [
  {
    title: "Advanced Analytics",
    description: "Get insights into your machine's performance",
    icon: "📊",
    link: "/advanced-analytics",
  },
  {
    title: "Real-time Monitoring",
    description: "Track your machine's status in real-time",
    icon: "🔍",
    link: "/real-time-monitoring",
  },
  {
    title: "Custom Reports",
    description: "Generate detailed reports tailored to your needs",
    icon: "📈",
    link: "/custom-reports",
  },
]

export default function HomePage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = () => {
    if (username === 'admin' && password === '1234') {
      window.location.href = '/master'
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-200 to-white relative p-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <SparklesCore
        id="tsparticlesheader"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full absolute"
        particleColor="#93c5fd"
      />
      
      {/* Meteor Effect */}
      <MeteorEffect />

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4 text-blue-600 mt-14">
          Welcome to BalancePro
        </h1>
        <h2 className="text-3xl sm:text-4xl text-blue-500">
          Advanced Web Interface for Precision Balancing
        </h2>
      </div>
      
      <div className="bg-white/90 backdrop-blur-lg p-8 rounded-lg shadow-2xl w-full max-w-md relative z-10">
        {error && (
          <p className="text-red-500 mb-4 text-sm">
            {error}
          </p>
        )}
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-white/70 border-blue-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/70 border-blue-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          />
        </div>
        <div className="flex justify-between mt-6 space-x-4">
          <Button
            onClick={handleSignIn}
            className="bg-blue-600 hover:bg-blue-700 text-white flex-1 transition-all duration-300"
          >
            Sign In
          </Button>
          <Button
            onClick={() => alert('Sign Up clicked')}
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white flex-1 transition-all duration-300"
          >
            Sign Up
          </Button>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-5xl px-4">
        <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">Key Features</h3>
        <HoverEffect items={features} />
      </div>
    </motion.div>
  )
}

const MeteorEffect = () => {
  const meteors = Array.from({ length: 10 }).map((_, index) => ({
    left: `${Math.random() * 100}vw`,
    top: `${Math.random() * 100}vh`,
    size: Math.random() * 20 + 10, // Size between 10 and 30
    duration: Math.random() * 2 + 1, // Duration between 1 and 3 seconds
  }));

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      {meteors.map((meteor, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-blue-500 opacity-75"
          style={{
            left: meteor.left,
            top: meteor.top,
            width: meteor.size,
            height: meteor.size,
          }}
          animate={{
            y: ['0%', '-150%'],
            opacity: [1, 0],
          }}
          transition={{
            duration: meteor.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};
