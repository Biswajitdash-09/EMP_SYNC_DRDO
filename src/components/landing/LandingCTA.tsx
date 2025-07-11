
/**
 * Landing Call-to-Action Section Component
 * Final CTA section with enhanced animations
 */

import RippleButton from "@/components/ui/ripple-button";
import ScrollReveal from "@/components/ui/scroll-reveal";

interface LandingCTAProps {
  onShowAuth: () => void;
  onShowEmployeeAuth: () => void;
}

const LandingCTA = ({
  onShowAuth,
  onShowEmployeeAuth
}: LandingCTAProps) => {
  return (
    <section className="py-20 bg-gray-900 dark:bg-gray-950 relative overflow-hidden">
      {/* Enhanced background with floating elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20" 
             style={{ animation: 'gradient-shift 12s ease-in-out infinite' }} />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-xl"
            style={{
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-shape ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <h2 className="text-4xl font-bold text-white mb-6 float">
            Ready to Transform Your HR?
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of companies already using our Employee Management System
          </p>
        </ScrollReveal>
        
        <ScrollReveal delay={400}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RippleButton 
              onClick={onShowAuth} 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 cta-pulse sparkle"
            >
              Get Started Today
            </RippleButton>
            
            <RippleButton 
              onClick={onShowEmployeeAuth} 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105 border-white text-white hover:text-gray-900 bg-blue-600 hover:bg-blue-500 btn-press"
            >
              Employee Access
            </RippleButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default LandingCTA;
