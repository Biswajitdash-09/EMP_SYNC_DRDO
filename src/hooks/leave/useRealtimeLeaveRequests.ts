
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { LeaveRequest } from '@/services/leave/types';

export const useRealtimeLeaveRequests = (initialRequests: LeaveRequest[] = []) => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialRequests);
  const { toast } = useToast();

  useEffect(() => {
    // Update local state when initial requests change
    setLeaveRequests(initialRequests);
  }, [initialRequests]);

  useEffect(() => {
    console.log('Setting up real-time subscription for leave requests');
    
    const channel = supabase
      .channel('leave_requests_realtime')
      .on(
        'postgres_changes',
        { 
          event: '*', 
          schema: 'public', 
          table: 'leave_requests' 
        },
        async (payload) => {
          console.log('Leave request change received:', payload);
          
          try {
            if (payload.eventType === 'INSERT') {
              // Get the full record with relations
              const { data: newRequest } = await supabase
                .from('leave_requests')
                .select(`
                  *,
                  employee:profiles!employee_id(full_name),
                  leave_type:leave_types(name)
                `)
                .eq('id', payload.new.id)
                .single();

              if (newRequest) {
                const formattedRequest: LeaveRequest = {
                  ...newRequest,
                  status: newRequest.status as 'pending' | 'approved' | 'rejected',
                  employee_name: newRequest.employee?.full_name || 'Unknown',
                  leave_type_name: newRequest.leave_type?.name || newRequest.leave_type || 'Unknown'
                };

                setLeaveRequests(prev => [formattedRequest, ...prev]);
                
                toast({
                  title: "New Leave Request",
                  description: `${formattedRequest.employee_name} submitted a new leave request`,
                });
              }
            } else if (payload.eventType === 'UPDATE') {
              // Get the updated record with relations
              const { data: updatedRequest } = await supabase
                .from('leave_requests')
                .select(`
                  *,
                  employee:profiles!employee_id(full_name),
                  leave_type:leave_types(name)
                `)
                .eq('id', payload.new.id)
                .single();

              if (updatedRequest) {
                const formattedRequest: LeaveRequest = {
                  ...updatedRequest,
                  status: updatedRequest.status as 'pending' | 'approved' | 'rejected',
                  employee_name: updatedRequest.employee?.full_name || 'Unknown',
                  leave_type_name: updatedRequest.leave_type?.name || updatedRequest.leave_type || 'Unknown'
                };

                setLeaveRequests(prev => 
                  prev.map(req => 
                    req.id === payload.new.id ? formattedRequest : req
                  )
                );

                // Show status update notification
                if (payload.old.status !== payload.new.status) {
                  toast({
                    title: "Leave Request Updated",
                    description: `Request status changed to ${payload.new.status}`,
                  });
                }
              }
            } else if (payload.eventType === 'DELETE') {
              setLeaveRequests(prev => 
                prev.filter(req => req.id !== payload.old.id)
              );
              
              toast({
                title: "Leave Request Deleted",
                description: `Request has been deleted`,
              });
            }
          } catch (error) {
            console.error('Error handling real-time leave request update:', error);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up leave requests real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [toast]);

  return { leaveRequests, setLeaveRequests };
};
