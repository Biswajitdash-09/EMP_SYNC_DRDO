
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmergencyContactFormData {
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
}

interface EmergencyContactFormProps {
  formData: EmergencyContactFormData;
  isEditing: boolean;
  onFormDataChange: (updates: Partial<EmergencyContactFormData>) => void;
  loading: boolean;
}

const EmergencyContactForm = ({
  formData,
  isEditing,
  onFormDataChange,
  loading
}: EmergencyContactFormProps) => {
  return (
    <div className="border-t pt-4">
      <h3 className="font-medium mb-4">Emergency Contact</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="emergencyName">Name</Label>
          {isEditing ? (
            <Input
              id="emergencyName"
              value={formData.emergencyContactName}
              onChange={(e) => onFormDataChange({ emergencyContactName: e.target.value })}
              disabled={loading}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{formData.emergencyContactName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Phone</Label>
          {isEditing ? (
            <Input
              id="emergencyPhone"
              value={formData.emergencyContactPhone}
              onChange={(e) => onFormDataChange({ emergencyContactPhone: e.target.value })}
              disabled={loading}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{formData.emergencyContactPhone}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyRelationship">Relationship</Label>
          {isEditing ? (
            <Input
              id="emergencyRelationship"
              value={formData.emergencyContactRelationship}
              onChange={(e) => onFormDataChange({ emergencyContactRelationship: e.target.value })}
              disabled={loading}
            />
          ) : (
            <p className="p-2 bg-gray-50 rounded">{formData.emergencyContactRelationship}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactForm;
