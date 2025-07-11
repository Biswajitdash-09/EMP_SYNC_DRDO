
/**
 * Landing Stats Section Component
 * Statistics banner with animated counters
 */

import { Badge } from "@/components/ui/badge";
import AnimatedCounter from "@/components/ui/animated-counter";
import ScrollReveal from "@/components/ui/scroll-reveal";

const LandingStats = () => {
  const stats = [
    { number: 10000, label: "Companies Trust Us", suffix: "+" },
    { number: 500, label: "Employees Managed", suffix: "K+" },
    { number: 99.9, label: "Uptime Guarantee", suffix: "%" },
    { number: 24, label: "Customer Support", suffix: "/7" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <ScrollReveal>
            <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-700 hover:scale-105 transition-transform duration-300">
              Trusted Worldwide
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal delay={200}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Numbers That Speak for Themselves
            </h2>
          </ScrollReveal>
          
          <ScrollReveal delay={400}>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join thousands of companies who trust our platform for their employee management needs
            </p>
          </ScrollReveal>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, index) => (
            <ScrollReveal key={index} delay={600 + index * 100}>
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl border border-blue-100 dark:border-slate-600 card-hover group">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingStats;
