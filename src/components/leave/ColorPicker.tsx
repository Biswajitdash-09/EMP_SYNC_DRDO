
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control } from 'react-hook-form';
import { LeaveTypeForm } from './schemas/leaveTypeSchema';

interface ColorPickerProps {
  control: Control<LeaveTypeForm>;
}

const ColorPicker = ({ control }: ColorPickerProps) => {
  const colorOptions = [
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'green', label: 'Green', class: 'bg-green-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'pink', label: 'Pink', class: 'bg-pink-500' },
    { value: 'yellow', label: 'Yellow', class: 'bg-yellow-500' },
    { value: 'indigo', label: 'Indigo', class: 'bg-indigo-500' }
  ];

  return (
    <FormField
      control={control}
      name="color"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Color Theme</FormLabel>
          <FormControl>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  className={`
                    h-10 rounded-md border-2 flex items-center justify-center text-white text-xs font-medium
                    ${color.class}
                    ${field.value === color.value ? 'border-gray-800' : 'border-gray-300'}
                  `}
                  onClick={() => field.onChange(color.value)}
                >
                  {color.label}
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ColorPicker;
