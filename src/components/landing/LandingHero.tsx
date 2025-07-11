
/**
 * Landing Hero Section Component
 * Main hero section with enhanced animations and effects
 */

import { ArrowRight, Users, Shield, BarChart3, Clock } from 'lucide-react';
import RippleButton from "@/components/ui/ripple-button";
import AnimatedBackground from "@/components/ui/animated-background";
import ScrollReveal from "@/components/ui/scroll-reveal";

interface LandingHeroProps {
  onShowAuth: () => void;
  onShowEmployeeAuth: () => void;
}

const LandingHero = ({
  onShowAuth,
  onShowEmployeeAuth
}: LandingHeroProps) => {
  return (
    <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <AnimatedBackground />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge with animation */}
          <ScrollReveal delay={200}>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 mb-6 sm:mb-8 hover:scale-105 transition-transform duration-300">
              <Shield className="w-4 h-4 mr-2 icon-scale" />
              Trusted by 1000+ Companies Worldwide
            </div>
          </ScrollReveal>

          {/* Main Heading with staggered animation */}
          <ScrollReveal delay={400}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 leading-tight">
              <span className="block mb-2">Transform Your</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mx-0 my-0 py-[10px] px-0 float">
                Employee Management
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal delay={600}>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed px-4">
              Streamline HR operations, boost productivity, and empower your workforce with our comprehensive Employee Management System. Built for modern businesses of all sizes.
            </p>
          </ScrollReveal>

          {/* Feature Highlights with staggered animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
            {[
              { icon: Users, title: "100+ Employees", desc: "Ready to manage" },
              { icon: Clock, title: "Real-time", desc: "Tracking & Updates" },
              { icon: Shield, title: "Secure", desc: "Data Protection" },
              { icon: BarChart3, title: "Analytics", desc: "Powerful Insights" }
            ].map((feature, index) => (
              <ScrollReveal key={index} delay={800 + index * 100}>
                <div className="flex flex-col items-center p-4 sm:p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 card-hover group">
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 dark:text-blue-400 mb-2 sm:mb-3 icon-bounce group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Enhanced CTA Buttons */}
          <ScrollReveal delay={1200}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12">
              <RippleButton 
                onClick={onShowAuth} 
                size="lg" 
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group cta-pulse sparkle relative"
              >
                Get Started Now
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </RippleButton>
              
              <RippleButton 
                onClick={onShowEmployeeAuth} 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto border-2 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 btn-press"
              >
                Employee Portal
              </RippleButton>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
