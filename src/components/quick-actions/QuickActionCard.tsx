
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  onAction: () => void;
}

const QuickActionCard = ({ title, description, icon: IconComponent, color, onAction }: QuickActionCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className={`p-2 rounded-full bg-${color}-100`}>
            <IconComponent className={`w-6 h-6 text-${color}-600`} />
          </div>
          <span>{title}</span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction} className="w-full">
          Start Action
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuickActionCard;
