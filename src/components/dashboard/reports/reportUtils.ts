
export interface Report {
  id: number;
  title: string;
  description: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'error';
  size: string;
  category: string;
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'error': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'HR': return 'bg-blue-100 text-blue-800';
    case 'Finance': return 'bg-green-100 text-green-800';
    case 'Performance': return 'bg-purple-100 text-purple-800';
    case 'Data': return 'bg-orange-100 text-orange-800';
    case 'System': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const downloadReport = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
