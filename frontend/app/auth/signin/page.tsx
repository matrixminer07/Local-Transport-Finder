'use client'

import { useState } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Chrome, Mail, Lock, User } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl: '/' })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome to Local Transport Finder
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to save routes and contribute to your community
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors disabled:opacity-50"
            >
              <Chrome className="w-5 h-5" />
              {isLoading ? 'Signing in...' : 'Continue with Google'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue without signing in</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full bg-primary hover:bg-blue-700 text-white rounded-lg px-4 py-3 text-sm font-medium transition-colors"
            >
              Browse as Guest
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
