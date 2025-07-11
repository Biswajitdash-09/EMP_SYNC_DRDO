
/**
 * Landing Footer Component
 * Enhanced footer with wave animation and interactive cards
 */

import { Users } from 'lucide-react';
import DeveloperContact from './DeveloperContact';
import ScrollReveal from "@/components/ui/scroll-reveal";

const LandingFooter = () => {
  return (
    <>
      {/* Wave Divider */}
      <div className="wave-divider h-16 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
      
      <footer className="bg-gray-800 dark:bg-gray-900 text-gray-300 py-12 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{
                width: `${60 + i * 20}px`,
                height: `${60 + i * 20}px`,
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
                animation: `float-shape ${10 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 1.2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <ScrollReveal>
              <div className="hover-lift p-4 rounded-lg transition-all duration-300">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Users className="w-5 h-5 text-white icon-bounce" />
                  </div>
                  <span className="text-lg font-bold text-white">EMP SYNC</span>
                </div>
                <p className="text-sm mb-4">
                  The most advanced employee management system for modern businesses.
                </p>
                <p className="text-sm text-gray-400">
                  Streamline your HR processes with our comprehensive solution designed for efficiency and growth.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <div className="hover-tilt">
                <DeveloperContact />
              </div>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={400}>
            <div className="border-t border-gray-700 pt-8 text-center text-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <p className="hover:text-blue-400 transition-colors duration-300">
                  © 2025 EMP SYNC. All rights reserved.
                </p>
                <p className="text-lime-400 float hover:scale-105 transition-transform duration-300">
                  Built with ❤️ for DRDO ( CAN and DC Lab )
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </>
  );
};

export default LandingFooter;
