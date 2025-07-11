
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PersonalInformationFormProps {
  formData: PersonalFormData;
  isEditing: boolean;
  onFormDataChange: (updates: Partial<PersonalFormData>) => void;
  loading: boolean;
}

const PersonalInformationForm = ({
  formData,
  isEditing,
  onFormDataChange,
  loading
}: PersonalInformationFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        {isEditing ? (
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            disabled={loading}
          />
        ) : (
          <p className="p-2 bg-gray-50 rounded">{formData.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <p className="p-2 bg-gray-100 rounded text-gray-500">{formData.email} (Read-only)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        {isEditing ? (
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => onFormDataChange({ phone: e.target.value })}
            disabled={loading}
          />
        ) : (
          <p className="p-2 bg-gray-50 rounded">{formData.phone}</p>
        )}
      </div>

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="address">Address</Label>
        {isEditing ? (
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => onFormDataChange({ address: e.target.value })}
            rows={2}
            disabled={loading}
          />
        ) : (
          <p className="p-2 bg-gray-50 rounded">{formData.address}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalInformationForm;
