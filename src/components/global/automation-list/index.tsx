'use client'
import React, { useMemo, useEffect, useState } from 'react';
import { usePaths } from '@/hooks/user-nav';
import { Button } from '@/components/ui/button';
import { useQueryAutomations } from '@/hooks/user-queries';
import CreateAutomation from '../create-automation';
import { useMutationDataState } from '@/hooks/use-mutation-data';
import { useAutomationPosts } from '@/hooks/use-automations';
import { FancyAutomationBox } from '../fancy/fancy-automation-box';

type Keyword = {
  id: string;
  automationId: string | null;
  word: string;
};

type Listener = {
  id: string;
  listener: string;
  automationId: string;
  prompt: string;
  commentReply: string | null;
  dmCount: number;
  commentCount: number;
};

type Automation = {
  id: string;
  name: string;
  active: boolean;
  keywords: Keyword[];
  createdAt: Date;
  listener: Listener | null;
};

type Props = {
  id: string;
};

const AutomationList = ({ id }: Props) => {
  const { data, refetch } = useQueryAutomations();
  const { deleteMutation } = useAutomationPosts(id);
  const { latestVariable } = useMutationDataState(['create-automation']);
  const { pathname } = usePaths();
 
  const [automations, setAutomations] = useState<Automation[]>(data?.data || []);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAutomationId, setSelectedAutomationId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data) {
      setAutomations(data.data);
    }
  }, [data]);

  const handleDelete = (automationId: string) => {
    deleteMutation(
      { id: automationId },
      {
        onSuccess: () => {
          console.log('Automation deleted successfully');
          setAutomations((prev) => prev.filter((a) => a.id !== automationId));
        },
        onError: (error) => {
          console.error('Error deleting automation:', error);
        },
      }
    );
  };

  const optimisticUiData = useMemo(() => {
    if (latestVariable?.variables && data) {
      const test = [latestVariable.variables, ...automations];
      return { data: test as Automation[] };
    }
    return { data: automations };
  }, [latestVariable, automations]);

  const activeAutomations = optimisticUiData.data.filter(automation => automation.active);
  const inactiveAutomations = optimisticUiData.data.filter(automation => !automation.active);

  if (!automations.length) {
    return (
      <div className="h-[70vh] flex justify-center items-center flex-col gap-y-3">
        <h3 className="text-lg text-gray-400">No automations yet.</h3>
        <h3 className="text-lg text-gray-400">Click the button to create one.</h3>
        <CreateAutomation />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Your live automations</h2>
        {activeAutomations.length > 0 ? (
          <div className="flex flex-col gap-y-6">
            {activeAutomations.map((automation) => (
              <FancyAutomationBox
                key={automation.id}
                automation={automation}
                onDelete={() => {
                  setSelectedAutomationId(automation.id);
                  setShowConfirmModal(true);
                }}
                pathname={pathname ||'/'}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No active automations. Activate an automation to see it here.</p>
        )}
      </div>

      {inactiveAutomations.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Inactive automations</h2>
          <div className="flex flex-col gap-y-6">
            {inactiveAutomations.map((automation) => (
              <FancyAutomationBox
                key={automation.id}
                automation={automation}
                onDelete={() => {
                  setSelectedAutomationId(automation.id);
                  setShowConfirmModal(true);
                }}
                pathname={pathname ||'/'}
              />
            ))}
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-primary p-6 rounded-lg text-white shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="text-sm mb-6">This action cannot be undone!</p>
            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-300 text-black hover:bg-gray-400"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  if (selectedAutomationId) {
                    handleDelete(selectedAutomationId);
                  }
                  setShowConfirmModal(false);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomationList;