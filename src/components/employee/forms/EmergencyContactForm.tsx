
/**
 * Emergency Contact Form Component
 * Handles emergency contact information fields
 */

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmergencyContactFormProps {
  formData: {
    emergencyContactName: string;
    emergencyContactPhone: string;
    emergencyContactRelationship: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const EmergencyContactForm = ({ formData, onInputChange }: EmergencyContactFormProps) => {
  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Emergency Contact</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyContactName">Contact Name</Label>
          <Input
            id="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={(e) => onInputChange('emergencyContactName', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
          <Input
            id="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={(e) => onInputChange('emergencyContactPhone', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyContactRelationship">Relationship</Label>
          <Input
            id="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={(e) => onInputChange('emergencyContactRelationship', e.target.value)}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactForm;
