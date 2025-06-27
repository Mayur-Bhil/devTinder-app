import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Heart,
  MessageCircle,
  Users,
  Shield,
  Star,
  MapPin,
  Smartphone,
  ArrowUp,
  Send,
  Coffee,
  Camera,
  Music,
  Gamepad2
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Find Matches', href: '#matches', icon: Heart },
    { name: 'Chat', href: '#chat', icon: MessageCircle },
    { name: 'Discover', href: '#discover', icon: Users },
    { name: 'Events', href: '#events', icon: Coffee },
    { name: 'Safety', href: '#safety', icon: Shield }
  ];

  const features = [
    { name: 'Smart Matching', href: '#', icon: Star },
    { name: 'Video Chat', href: '#', icon: Camera },
    { name: 'Music Sync', href: '#', icon: Music },
    { name: 'Game Zone', href: '#', icon: Gamepad2 },
    { name: 'Location Based', href: '#', icon: MapPin }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-pink-400' },
    { icon: Twitter, href: '#', color: 'hover:text-pink-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-400' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-pink-900 to-purple-900 text-white relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 animate-bounce">
          <Heart className="w-6 h-6 text-pink-400 fill-current" />
        </div>
        <div className="absolute top-20 right-20 animate-pulse">
          <Heart className="w-4 h-4 text-red-400 fill-current" />
        </div>
        <div className="absolute bottom-20 left-1/4 animate-ping">
          <Heart className="w-5 h-5 text-pink-300 fill-current" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-bounce">
          <Heart className="w-3 h-3 text-red-300 fill-current" />
        </div>
      </div>

      {/* Newsletter/App Download Section */}
      <div className="relative border-b border-pink-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                <Smartphone className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Download Our App
            </h3>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-2">
              Start your journey to find meaningful connections. Available on iOS and Android.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-3 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 font-semibold">
                <div className="w-6 h-6 bg-white rounded text-black flex items-center justify-center text-xs font-bold">
                  📱
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Download on the</div>
                  <div className="text-sm">App Store</div>
                </div>
              </button>
              <button className="px-8 py-3 bg-black rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 font-semibold">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-green-400 rounded flex items-center justify-center text-xs">
                  ▶
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-400">Get it on</div>
                  <div className="text-sm">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12">
          
          {/* App Info */}
          <div className="space-y-5 md:space-y-6 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
                <div className="p-2 bg-gradient-to-r from-pink-500 to-red-500 rounded-full">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                  DevTinder
                </h2>
              </div>
              <p className="text-gray-300 mt-3 md:mt-4 leading-relaxed text-sm md:text-base px-2 md:px-0">
                Where meaningful connections begin. Swipe, match, chat, and discover your perfect match in a safe and fun environment.
              </p>
            </div>
            
            {/* App Stats */}
            <div className="grid grid-cols-3 gap-4 py-4">
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-pink-400">50M+</div>
                <div className="text-xs text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-red-400">1M+</div>
                <div className="text-xs text-gray-400">Matches Daily</div>
              </div>
              <div className="text-center">
                <div className="text-lg md:text-xl font-bold text-purple-400">4.8★</div>
                <div className="text-xs text-gray-400">App Rating</div>
              </div>
            </div>
          </div>

          {/* Quick Links & Features */}
          <div className="md:col-span-1 lg:col-span-1 order-3 md:order-2">
            <div className="grid grid-cols-2 gap-6 md:gap-8 items-start">
              {/* Quick Links */}
              <div className="flex flex-col">
                <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white text-center md:text-left">Explore</h3>
                <ul className="space-y-2 md:space-y-3 flex-1">
                  {quickLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={index} className="group text-center md:text-left">
                        <a
                          href={link.href}
                          className="text-gray-300 hover:text-pink-400 transition-all duration-300 inline-flex items-center justify-center md:justify-start gap-2 text-sm md:text-base w-full"
                        >
                          <IconComponent size={16} className="flex-shrink-0" />
                          <span className="relative">
                            {link.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Features */}
              <div className="flex flex-col">
                <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white text-center md:text-left">Features</h3>
                <ul className="space-y-2 md:space-y-3 flex-1">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <li key={index} className="group text-center md:text-left">
                        <a
                          href={feature.href}
                          className="text-gray-300 hover:text-purple-400 transition-all duration-300 inline-flex items-center justify-center md:justify-start gap-2 text-sm md:text-base w-full"
                        >
                          <IconComponent size={16} className="flex-shrink-0" />
                          <span className="relative">
                            {feature.name}
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-300"></span>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Social & Premium */}
          <div className="order-2 md:order-3 text-center md:text-left">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white">Join Our Community</h3>
            
            {/* Social Links */}
            <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 justify-center md:justify-start">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className={`p-3 bg-gradient-to-r from-pink-600 to-red-600 rounded-full ${link.color} hover:from-pink-500 hover:to-red-500 active:scale-95 transition-all duration-300`}
                  >
                    <IconComponent size={18} className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                );
              })}
            </div>

            {/* Premium CTA */}
            <div className="space-y-3">
              <button className="w-full max-w-xs md:max-w-none mx-auto md:mx-0 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-600 rounded-full hover:from-pink-600 hover:to-red-700 active:scale-95 transition-all duration-300 font-semibold text-sm md:text-base shadow-lg">
                ✨ Get Premium
              </button>
              <p className="text-xs text-gray-400">Unlock unlimited likes & super features</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-pink-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            {/* Copyright */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 text-xs md:text-sm">
              <span>© 2025 DevTinder. Spreading love</span>
              <Heart size={14} className="text-pink-500 fill-current flex-shrink-0 animate-pulse" />
              <span>one match at a time</span>
            </div>
            
            {/* Links and Scroll to Top */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <div className="flex items-center gap-4 md:gap-6">
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-xs md:text-sm">
                  Safety Tips
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-xs md:text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-pink-400 transition-colors text-xs md:text-sm">
                  Terms of Use
                </a>
              </div>
              <button
                onClick={scrollToTop}
                className="p-2 bg-gradient-to-r from-pink-600 to-red-600 rounded-full hover:from-pink-500 hover:to-red-500 active:scale-95 transition-all duration-300"
                aria-label="Scroll to top"
              >
                <ArrowUp size={16} className="w-3.5 h-3.5 md:w-4 md:h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;