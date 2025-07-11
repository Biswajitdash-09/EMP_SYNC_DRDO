
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeadphonesIcon, Plus, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Ticket {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdDate: string;
  lastUpdate: string;
  responses: Array<{
    from: string;
    message: string;
    timestamp: string;
  }>;
}

const SupportTicketing = () => {
  const { toast } = useToast();
  const [showNewTicketForm, setShowNewTicketForm] = useState(false);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium'
  });

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT001',
      title: 'Unable to access payroll system',
      description: 'Getting authentication error when trying to view payslips',
      category: 'IT Support',
      priority: 'high',
      status: 'In Progress',
      createdDate: '2024-07-03',
      lastUpdate: '2024-07-04',
      responses: [
        {
          from: 'IT Support',
          message: 'We are looking into this issue. Please try clearing your browser cache.',
          timestamp: '2024-07-04T10:30:00'
        }
      ]
    },
    {
      id: 'TKT002',
      title: 'Request for additional training',
      description: 'Would like to attend the upcoming React workshop',
      category: 'HR Request',
      priority: 'medium',
      status: 'Open',
      createdDate: '2024-07-02',
      lastUpdate: '2024-07-02',
      responses: []
    }
  ]);

  const categories = ['IT Support', 'HR Request', 'Payroll Query', 'Leave Query', 'Other'];
  const priorities = ['low', 'medium', 'high', 'urgent'];

  const handleSubmitTicket = () => {
    if (!newTicket.title || !newTicket.description || !newTicket.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const ticket: Ticket = {
      id: `TKT${String(tickets.length + 1).padStart(3, '0')}`,
      ...newTicket,
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0],
      lastUpdate: new Date().toISOString().split('T')[0],
      responses: []
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ title: '', description: '', category: '', priority: 'medium' });
    setShowNewTicketForm(false);

    toast({
      title: "Ticket Created",
      description: `Your support ticket ${ticket.id} has been submitted.`,
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved':
      case 'Closed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'In Progress':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return <MessageCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved':
      case 'Closed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HeadphonesIcon className="w-5 h-5" />
              Support Tickets
            </div>
            <Button onClick={() => setShowNewTicketForm(!showNewTicketForm)}>
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showNewTicketForm && (
            <div className="border rounded-lg p-4 mb-6 bg-gray-50">
              <h3 className="font-medium mb-4">Create New Support Ticket</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input
                    value={newTicket.title}
                    onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <Select
                      value={newTicket.category}
                      onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Priority</label>
                    <Select
                      value={newTicket.priority}
                      onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description *</label>
                  <Textarea
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                    placeholder="Detailed description of the issue or request"
                    rows={4}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleSubmitTicket}>Submit Ticket</Button>
                  <Button variant="outline" onClick={() => setShowNewTicketForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(ticket.status)}
                    <h4 className="font-medium">{ticket.title}</h4>
                    <span className="text-sm text-gray-500">#{ticket.id}</span>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-2">{ticket.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Category: {ticket.category}</span>
                  <span>Created: {new Date(ticket.createdDate).toLocaleDateString()}</span>
                  <span>Last Update: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                </div>
                
                {ticket.responses.length > 0 && (
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm font-medium mb-1">Latest Response:</p>
                    <div className="bg-blue-50 p-2 rounded text-sm">
                      <p><strong>{ticket.responses[ticket.responses.length - 1].from}:</strong></p>
                      <p>{ticket.responses[ticket.responses.length - 1].message}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportTicketing;
