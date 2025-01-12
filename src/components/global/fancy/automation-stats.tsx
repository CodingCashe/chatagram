import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

interface AutomationStatsProps {
  automation: {
    listener: {
      commentCount: number;
      dmCount: number;
    } | null;
  };
}

const AutomationStats: React.FC<AutomationStatsProps> = ({ automation }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center">
        <MessageSquare size={16} className="text-blue-400 mr-2" />
        <span className="text-sm text-gray-300">
          {automation.listener?.commentCount || 0} Comments
        </span>
      </div>
      <div className="flex items-center">
        <Send size={16} className="text-green-400 mr-2" />
        <span className="text-sm text-gray-300">
          {automation.listener?.dmCount || 0} DMs
        </span>
      </div>
    </div>
  );
};

export default AutomationStats;

