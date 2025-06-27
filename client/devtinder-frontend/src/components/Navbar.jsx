import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSclice";
import { Heart, Search, User, Settings, LogOut, Bell, MessageCircle } from "lucide-react";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const HandelLogout = async () => {
    console.log("button clicked");
    
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      
      dispatch(removeUser());
      setIsDropdownOpen(false);
      return navigate("/login");
    } catch (error) {
      console.log("error ", error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 shadow-xl backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center space-x-2">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-white hover:text-pink-100 transition-all duration-300 group"
            >
              <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                <Heart className="w-6 h-6 fill-current animate-pulse" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent">
                DevTinder
              </span>
            </Link>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for your perfect match..."
                className="w-full pl-10 pr-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            
            <button className="md:hidden bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300">
              <Search className="w-5 h-5 text-white" />
            </button>

            {user ? (
              <>
                <button className="relative bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 group">
                  <Bell className="w-5 h-5 text-white group-hover:animate-bounce" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    3
                  </span>
                </button>

                <button className="relative bg-white/20 hover:bg-white/30 p-2 rounded-full transition-all duration-300 group">
                  <MessageCircle className="w-5 h-5 text-white group-hover:animate-bounce" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    5
                  </span>
                </button>

                {/* Welcome Message - Hidden on small screens */}
                <div className="hidden lg:flex items-center text-white/90">
                  <span className="text-sm font-medium">
                    Welcome, <span className="text-white font-semibold">{user.firstName}</span>
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 rounded-full p-1 pr-3 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-white/50 overflow-hidden group-hover:border-white/80 transition-all duration-300">
                      <img
                        src={user.photoUrl || "/api/placeholder/32/32"}
                        alt={user.firstName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/api/placeholder/32/32";
                        }}
                      />
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-white text-sm font-medium truncate max-w-20">
                        {user.firstName}
                      </div>
                    </div>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-fit h-fit bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                      
                      <div className="px-4 py-3 border-b border-gray-200/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-200">
                            <img
                              src={user.photoUrl || "/api/placeholder/48/48"}
                              alt={user.firstName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-gray-600">{user.emailId}</p>
                          </div>
                        </div>
                      </div>
                    
                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 group"
                        >
                          <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">My Profile</span>
                          <span className="ml-auto bg-pink-100 text-pink-600 text-xs px-2 py-1 rounded-full">
                            New
                          </span>
                        </Link>

                        <button
                          onClick={() => setIsDropdownOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-200 group"
                        >
                          <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                          <span className="font-medium">Settings</span>
                        </button>

                        <div className="border-t border-gray-200/50 my-2"></div>

                        <button
                          onClick={HandelLogout}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-all duration-200 group"
                        >
                          <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Login/Signup Buttons for non-authenticated users */
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-pink-600 hover:bg-pink-50 px-4 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;