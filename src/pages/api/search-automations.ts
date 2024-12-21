// import { NextApiRequest, NextApiResponse } from 'next';
// import { useQueryAutomations } from '@/hooks/user-queries';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { query } = req.query;
  
//   if (typeof query !== 'string') {
//     return res.status(400).json({ error: 'Invalid query parameter' });
//   }

//   try {
//     const { data } = await useQueryAutomations();
    
//     const filteredAutomations = data.filter((automation) => 
//       automation.name.toLowerCase().includes(query.toLowerCase()) ||
//       automation.keywords.some((keyword) => keyword.word.toLowerCase().includes(query.toLowerCase())) ||
//       automation.status.toLowerCase().includes(query.toLowerCase())
//     );

//     res.status(200).json(filteredAutomations);
//   } catch (error) {
//     console.error('Error searching automations:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }


// import { NextApiRequest, NextApiResponse } from 'next';
// import { getAllAutomations } from '@/actions/automations/index'; // We'll create this function

// interface Automation {
//   id: string;
//   name: string;
//   status: string;
//   keywords: { id: string; word: string }[];
//   listener: {
//     id: string;
//     listener: string;
//     automationId: string;
//     prompt: string;
//     commentReply: string | null;
//     dmCount: number;
//     commentCount: number;
//   } | null;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { query } = req.query;
  
//   if (typeof query !== 'string') {
//     return res.status(400).json({ error: 'Invalid query parameter' });
//   }

//   try {
//     const automations = await getAllAutomations();
    
//     const filteredAutomations = automations.filter((automation: Automation) => 
//       automation.name.toLowerCase().includes(query.toLowerCase()) ||
//       automation.keywords.some((keyword) => keyword.word.toLowerCase().includes(query.toLowerCase())) ||
//       (automation.status && automation.status.toLowerCase().includes(query.toLowerCase()))
//     );

//     res.status(200).json(filteredAutomations);
//   } catch (error) {
//     console.error('Error searching automations:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

// import { NextApiRequest, NextApiResponse } from 'next';
// import { getAllAutomations } from '@/actions/automations/index';

// interface Automation {
//   id: string;
//   name: string;
//   keywords: { id: string; word: string }[];
//   listener: {
//     id: string;
//     listener: string;
//     automationId: string;
//     prompt: string;
//     commentReply: string | null;
//     dmCount: number;
//     commentCount: number;
//   } | null;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { query } = req.query;

//   if (typeof query !== 'string') {
//     return res.status(400).json({ error: 'Invalid query parameter' });
//   }

//   try {
//     // Get the response from getAllAutomations
//     const response = await getAllAutomations();

//     // Check if status is successful
//     if (response.status !== 200) {
//       return res.status(response.status).json({ error: 'Unable to fetch automations' });
//     }

//     // Access the data array
//     const automations = response.data;

//     // Filter the automations
//     const filteredAutomations = automations.filter((automation: Automation) => 
//       automation.name.toLowerCase().includes(query.toLowerCase()) ||
//       automation.keywords.some((keyword) => keyword.word.toLowerCase().includes(query.toLowerCase()))
      
//     );

//     res.status(200).json(filteredAutomations);
//   } catch (error) {
//     console.error('Error searching automations:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }



