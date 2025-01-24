'use server'

import { client } from '@/lib/prisma'

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface Conversation {
  id: string;
  senderId: string | null;
  reciever: string | null;
  messages: Message[];
  lastMessage: string;
}

export async function getChats(automationId: string): Promise<Conversation[]> {
  try {
    const chats = await client.dms.findMany({
      where: {
        automationId: automationId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        senderId: true,
        reciever: true,
        message: true,
        createdAt: true,
      },
    });

    const conversations: Record<string, Conversation> = {};

    chats.forEach(chat => {
      const conversationId = `${chat.senderId}_${chat.reciever}`;
      if (!conversations[conversationId]) {
        conversations[conversationId] = {
          id: conversationId,
          senderId: chat.senderId,
          reciever: chat.reciever,
          messages: [],
          lastMessage: '',
        };
      }
      
      conversations[conversationId].messages.push({
        role: chat.senderId === automationId ? 'assistant' : 'user',
        content: chat.message || '',
      });
      
      if (!conversations[conversationId].lastMessage) {
        conversations[conversationId].lastMessage = chat.message || '';
      }
    });

    return Object.values(conversations);
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw new Error('Failed to fetch chats');
  }
}