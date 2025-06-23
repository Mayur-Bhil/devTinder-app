import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  Heart,
  ArrowUp,
  Send
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', href: '#' },
    { name: 'Mobile Apps', href: '#' },
    { name: 'UI/UX Design', href: '#' },
    { name: 'Digital Marketing', href: '#' },
    { name: 'Consulting', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
    { icon: Twitter, href: '#', color: 'hover:text-sky-400' },
    { icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { icon: Github, href: '#', color: 'hover:text-gray-400' }
  ];

  return (
    <footer className="bg-gradient-to-br translate-y-full from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto text-sm md:text-base leading-relaxed px-2">
              Subscribe to our newsletter and get the latest updates, tips, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col gap-3 max-w-sm md:max-w-md mx-auto px-4 md:px-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 md:py-3 rounded-lg bg-gray-800 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 text-sm md:text-base"
              />
              <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm md:text-base">
                <Send size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12">
          
          {/* Company Info */}
          <div className="space-y-5 md:space-y-6 text-center md:text-left">
            <div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DevTinder
              </h2>
              <p className="text-gray-300 mt-3 md:mt-4 leading-relaxed text-sm md:text-base px-2 md:px-0">
                Creating amazing digital experiences with cutting-edge technology and innovative design solutions.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3 md:space-y-3">
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors justify-center md:justify-start">
                <MapPin size={18} className="text-blue-400 flex-shrink-0" />
                <span className="text-sm md:text-base">123 Tech Street, Digital City</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors justify-center md:justify-start">
                <Phone size={18} className="text-green-400 flex-shrink-0" />
                <span className="text-sm md:text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors justify-center md:justify-start">
                <Mail size={18} className="text-red-400 flex-shrink-0" />
                <span className="text-sm md:text-base">hello@devtinder.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links & Services */}
          <div className="md:col-span-1 lg:col-span-1 order-3 md:order-2">
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white text-center md:text-left">Quick Links</h3>
                <ul className="space-y-2 md:space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index} className="group text-center md:text-left">
                      <a
                        href={link.href}
                        className="text-gray-300 hover:text-white transition-all duration-300 inline-block relative overflow-hidden text-sm md:text-base"
                      >
                        <span className="relative z-10">{link.name}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-500 ease-out"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white text-center md:text-left">Services</h3>
                <ul className="space-y-2 md:space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="group text-center md:text-left">
                      <a
                        href={service.href}
                        className="text-gray-300 hover:text-white transition-all duration-300 inline-block relative overflow-hidden text-sm md:text-base"
                      >
                        <span className="relative z-10">{service.name}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-500 ease-out"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Social & CTA */}
          <div className="order-2 md:order-3 text-center md:text-left">
            <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-white">Connect With Us</h3>
            
            {/* Social Links */}
            <div className="flex gap-3 md:gap-4 mb-6 md:mb-8 justify-center md:justify-start">
              {socialLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={index}
                    href={link.href}
                    className={`p-2.5 md:p-3 bg-gray-800 rounded-full ${link.color} hover:bg-gray-700 active:scale-95 transition-all duration-300`}
                  >
                    <IconComponent size={18} className="w-4 h-4 md:w-5 md:h-5" />
                  </a>
                );
              })}
            </div>

            {/* CTA Button */}
            <button className="w-full max-w-xs md:max-w-none mx-auto md:mx-0 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg hover:from-purple-600 hover:to-pink-700 active:scale-95 transition-all duration-300 font-semibold text-sm md:text-base">
              Start Your Project
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
            {/* Copyright */}
            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-300 text-xs md:text-sm">
              <span>© 2025 DevTinder. Made with</span>
              <Heart size={14} className="text-red-500 fill-current flex-shrink-0" />
              <span>by passionate developers</span>
            </div>
            
            {/* Links and Scroll to Top */}
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
              <div className="flex items-center gap-4 md:gap-6">
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs md:text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-xs md:text-sm">
                  Terms of Service
                </a>
              </div>
              <button
                onClick={scrollToTop}
                className="p-2 bg-blue-600 rounded-full hover:bg-blue-700 active:scale-95 transition-all duration-300"
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