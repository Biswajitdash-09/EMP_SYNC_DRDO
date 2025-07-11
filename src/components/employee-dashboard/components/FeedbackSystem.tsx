
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { feedbackService, FeedbackEntry } from '@/services/feedbackService';

const FeedbackSystem = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [feedbackForm, setFeedbackForm] = useState({
    feedback_type: '',
    subject: '',
    message: '',
    rating: 0,
    is_anonymous: false
  });

  const [previousFeedback, setPreviousFeedback] = useState<FeedbackEntry[]>([]);

  const categories = [
    'Management',
    'Work Environment', 
    'Compensation & Benefits',
    'Training & Development',
    'Communication',
    'Work-Life Balance',
    'Company Policies',
    'Team Collaboration',
    'General Feedback'
  ];

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    try {
      setLoading(true);
      const feedback = await feedbackService.getFeedback();
      setPreviousFeedback(feedback);
    } catch (error) {
      console.error('Error loading feedback:', error);
      toast({
        title: "Error",
        description: "Failed to load feedback history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!feedbackForm.feedback_type || !feedbackForm.message || feedbackForm.rating === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields and provide a rating.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      
      await feedbackService.submitFeedback({
        feedback_type: feedbackForm.feedback_type,
        subject: feedbackForm.feedback_type, // Use category as subject
        message: feedbackForm.message,
        rating: feedbackForm.rating,
        is_anonymous: feedbackForm.is_anonymous
      });

      // Refresh feedback list
      await loadFeedback();

      // Reset form
      setFeedbackForm({
        feedback_type: '',
        subject: '',
        message: '',
        rating: 0,
        is_anonymous: false
      });

      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback. It has been sent to HR for review.",
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Submission Failed",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={interactive ? () => setFeedbackForm({...feedbackForm, rating: star}) : undefined}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'acted_upon': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Submit Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <Select
                value={feedbackForm.feedback_type}
                onValueChange={(value) => setFeedbackForm({ ...feedbackForm, feedback_type: value })}
                disabled={submitting}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating *</label>
              {renderStars(feedbackForm.rating, true)}
              <p className="text-xs text-gray-500 mt-1">Click to rate from 1 to 5 stars</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Feedback *</label>
              <Textarea
                value={feedbackForm.message}
                onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                placeholder="Share your thoughts, suggestions, or concerns..."
                rows={5}
                disabled={submitting}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="anonymous"
                checked={feedbackForm.is_anonymous}
                onCheckedChange={(checked) => 
                  setFeedbackForm({ ...feedbackForm, is_anonymous: checked as boolean })
                }
                disabled={submitting}
              />
              <label htmlFor="anonymous" className="text-sm">
                Submit anonymously
              </label>
            </div>

            <Button 
              onClick={handleSubmitFeedback} 
              className="w-full"
              disabled={submitting}
            >
              <Send className="w-4 h-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Previous Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <p className="text-gray-500 text-center py-4">Loading feedback...</p>
            ) : previousFeedback.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No previous feedback submitted</p>
            ) : (
              previousFeedback.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{feedback.feedback_type}</h4>
                      {feedback.is_anonymous && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded">Anonymous</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(feedback.rating)}
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(feedback.status)}`}>
                        {feedback.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2">{feedback.message}</p>
                  
                  <p className="text-xs text-gray-500">
                    Submitted: {new Date(feedback.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FeedbackSystem;
