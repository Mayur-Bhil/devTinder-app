import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSclice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL} from "../utils/constants"
import { Heart, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelLogin = async() => {
    setIsLoading(true);
    setError("");
    
    try {
      const res = await axios.post(BASE_URL+"/login", {
        emailId,
        password
      }, {
        withCredentials: true
      })
      console.log(res.data.user);
      dispatch(addUser(res.data.user))
      navigate("/")
    } catch (error) {
      console.error(error);
      setError(error?.response?.data?.message || "Something went wrong")
    }
    setIsLoading(false);
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-pink-400 via-red-500 to-purple-600 flex items-center justify-center p-4 relative overflow-hidden'>
      
      {/* Animated Background Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 animate-bounce">
          <Heart className="w-8 h-8 text-pink-200/30 fill-current" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <Heart className="w-6 h-6 text-red-200/40 fill-current" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-ping">
          <Heart className="w-10 h-10 text-pink-300/20 fill-current" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-bounce delay-300">
          <Heart className="w-4 h-4 text-red-200/50 fill-current" />
        </div>
        <div className="absolute bottom-1/3 left-1/2 animate-pulse delay-500">
          <Heart className="w-7 h-7 text-pink-200/25 fill-current" />
        </div>
        <div className="absolute top-1/2 left-20 animate-ping delay-700">
          <Heart className="w-5 h-5 text-red-300/35 fill-current" />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 relative">
          
          {/* Floating Heart on Card */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-full shadow-lg animate-pulse">
              <Heart className="w-8 h-8 text-white fill-current" />
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8 mt-4">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-pink-100">Sign in to find your perfect match</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            
            {/* Email Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-pink-100 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={emailId}
                  type="email"
                  className="w-full pl-10 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label className="block text-sm font-medium text-pink-100 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className=" border border-red-400/50 rounded-xl p-3 animate-pulse">
                <p className="text-red-600 text-sm text-center font-medium">{error}</p>
              </div>
            )}

            {/* Login Button */}
            <button
              onClick={handelLogin}
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-current" />
                  Sign In
                </>
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-center">
              <a href="#" className="text-pink-200 hover:text-white text-sm transition-colors">
                Forgot your password?
              </a>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-pink-100">or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-pink-100">
                Don't have an account?{' '}
                <a href="#" className="text-white font-semibold hover:underline transition-all">
                  Sign up now
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Floating Hearts */}
        <div className="absolute -bottom-2 -left-2 animate-bounce delay-1000">
          <Heart className="w-6 h-6 text-pink-300 fill-current opacity-60" />
        </div>
        <div className="absolute -bottom-3 -right-1 animate-pulse delay-1200">
          <Heart className="w-4 h-4 text-red-300 fill-current opacity-50" />
        </div>
      </div>
    </div>
  )
}

export default Login