export interface Automation {
    id: string;
    name: string;
    status: 'active' | 'inactive';
    createdAt: string;
  }
  
  const mockAutomations: Automation[] = [
    { id: '1', name: 'Email Newsletter', status: 'active', createdAt: '2023-06-01T10:00:00Z' },
    { id: '2', name: 'Social Media Posting', status: 'inactive', createdAt: '2023-06-02T14:30:00Z' },
    { id: '3', name: 'Customer Onboarding', status: 'active', createdAt: '2023-06-03T09:15:00Z' },
    { id: '4', name: 'Lead Nurturing', status: 'active', createdAt: '2023-06-04T11:45:00Z' },
    { id: '5', name: 'Abandoned Cart Recovery', status: 'inactive', createdAt: '2023-06-05T16:20:00Z' },
  ];
  
  export async function searchAutomations(query: string): Promise<Automation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
  
    return mockAutomations.filter(automation => 
      automation.name.toLowerCase().includes(query.toLowerCase()) ||
      automation.status.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  