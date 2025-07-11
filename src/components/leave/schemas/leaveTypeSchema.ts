
import { z } from 'zod';

export const leaveTypeSchema = z.object({
  name: z.string().min(1, "Leave type name is required"),
  description: z.string().min(1, "Description is required"),
  maxDays: z.number().min(1, "Maximum days must be at least 1"),
  carryForward: z.boolean(),
  requiresApproval: z.boolean(),
  color: z.string().min(1, "Color is required")
});

export type LeaveTypeForm = z.infer<typeof leaveTypeSchema>;
