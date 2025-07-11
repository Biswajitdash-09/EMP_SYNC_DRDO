
import { FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from 'react-hook-form';
import { LeaveTypeForm } from './schemas/leaveTypeSchema';

interface LeaveTypeSettingsProps {
  control: Control<LeaveTypeForm>;
}

const LeaveTypeSettings = ({ control }: LeaveTypeSettingsProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="carryForward"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Carry Forward</FormLabel>
              <FormDescription className="text-sm">
                Allow unused days to carry forward to next year
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="requiresApproval"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <FormLabel>Requires Approval</FormLabel>
              <FormDescription className="text-sm">
                Requests need manager approval before confirmation
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

export default LeaveTypeSettings;
