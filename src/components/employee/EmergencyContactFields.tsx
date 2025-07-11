
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EmergencyContactData {
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
}

interface EmergencyContactFieldsProps {
  formData: EmergencyContactData;
  setFormData: (data: any) => void;
}

const EmergencyContactFields = ({ formData, setFormData }: EmergencyContactFieldsProps) => {
  return (
    <div className="pt-4 border-t">
      <h4 className="font-semibold mb-3">Emergency Contact</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="emergencyContactName">Contact Name</Label>
          <Input
            id="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={(e) => setFormData((prev: any) => ({...prev, emergencyContactName: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="emergencyContactPhone">Contact Phone</Label>
          <Input
            id="emergencyContactPhone"
            value={formData.emergencyContactPhone}
            onChange={(e) => setFormData((prev: any) => ({...prev, emergencyContactPhone: e.target.value}))}
          />
        </div>
        <div>
          <Label htmlFor="emergencyContactRelationship">Relationship</Label>
          <Input
            id="emergencyContactRelationship"
            value={formData.emergencyContactRelationship}
            onChange={(e) => setFormData((prev: any) => ({...prev, emergencyContactRelationship: e.target.value}))}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactFields;
