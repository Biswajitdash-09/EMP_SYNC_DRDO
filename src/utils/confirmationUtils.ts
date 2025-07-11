
/**
 * Simple confirmation utility for task completion dialogs
 * Provides standardized yes/no confirmation messages without complex URLs
 */

export const getSimpleConfirmationMessage = (action: string): string => {
  const messages = {
    'delete': 'Are you sure you want to delete this item?',
    'save': 'Save changes?',
    'submit': 'Submit this form?',
    'update': 'Update this information?',
    'remove': 'Remove this item?',
    'approve': 'Approve this request?',
    'reject': 'Reject this request?',
    'complete': 'Mark as complete?',
    'cancel': 'Cancel this action?',
    'export': 'Export this data?',
    'import': 'Import this data?',
    'reset': 'Reset to default settings?',
    'logout': 'Log out now?',
    'default': 'Confirm this action?'
  };

  return messages[action.toLowerCase() as keyof typeof messages] || messages.default;
};

export const getSimpleSuccessMessage = (action: string): string => {
  const messages = {
    'delete': 'Item deleted successfully',
    'save': 'Changes saved successfully',
    'submit': 'Form submitted successfully',
    'update': 'Information updated successfully',
    'remove': 'Item removed successfully',
    'approve': 'Request approved successfully',
    'reject': 'Request rejected successfully',
    'complete': 'Task completed successfully',
    'cancel': 'Action cancelled',
    'export': 'Data exported successfully',
    'import': 'Data imported successfully',
    'reset': 'Settings reset successfully',
    'logout': 'Logged out successfully',
    'default': 'Action completed successfully'
  };

  return messages[action.toLowerCase() as keyof typeof messages] || messages.default;
};
