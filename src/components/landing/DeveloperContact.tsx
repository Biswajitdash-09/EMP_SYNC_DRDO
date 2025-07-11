
/**
 * Developer Contact Component
 * Contact information for developers
 */

import { Button } from "@/components/ui/button";
import { Mail, Code } from 'lucide-react';

const DeveloperContact = () => {
  const developers = [
    {
      name: "Biswajit Dash",
      email: "biswajitdash929@gmail.com",
      role: "Full-Stack AI web developer"
    },
    {
      name: "Manisha Sahu",
      email: "manisha.s63720@gmail.com", 
      role: "Frontend web developer"
    },
    {
      name: "Sagar Mohapatra",
      email: "mohapatrasagar1404@gmail.com",
      role: "Backend web developer"
    },
    {
      name: "Jeeban Jyoti Das",
      email: "jeebanjyotidas2003@gmail.com",
      role: "UI/UX design"
    },
    {
      name: "Suchismita Behera",
      email: "krishnabehera2575@gmail.com",
      role: "Frontend web developer"
    },
    {
      name: "Anuradha Raj",
      email: "anuradharaj2002@gmail.com",
      role: "Backend web developer"
    },
    {
      name: "Sayed Habibur Rehman",
      email: "habibursayad@gmail.com",
      role: "System Design"
    },
    {
      name: "Rohit Kumar Majhi",
      email: "rkmrohit2@gmail.com",
      role: "Software testing"
    },
    {
      name: "Swayamjeet Singha",
      email: "mayanjeetsingha456@gmail.com",
      role: "Cyber Security"
    }
  ];

  const handleEmailClick = (email: string, name: string) => {
    const subject = encodeURIComponent(`Contact from EMP SYNC - Development Inquiry`);
    const body = encodeURIComponent(`Hello ${name},\n\nI'm reaching out regarding EMP SYNC development.\n\nBest regards,`);
    window.open(`mailto:${email}?subject=${subject}&body=${body}`);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Code className="w-5 h-5 text-white" />
        <h4 className="font-semibold text-white text-lg">Development Team</h4>
      </div>
      <p className="text-blue-100 mb-4 text-sm">
        Have questions about EMP SYNC or need technical support? Contact our development team directly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
        {developers.map((dev, index) => (
          <div key={index} className="flex flex-col bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="mb-2">
              <p className="font-medium text-white text-sm">{dev.name}</p>
              <p className="text-blue-100 text-xs">{dev.role}</p>
            </div>
            <Button
              onClick={() => handleEmailClick(dev.email, dev.name)}
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 w-full text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Contact
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeveloperContact;
