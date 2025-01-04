import { create } from 'zustand'
import { Message } from '@/types/chat'
import { db } from '@/lib/firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

interface ChatStore {
  messages: Message[]
  addMessage: (message: Message) => void
  loadChatHistory: (userId: string) => Promise<void>
  saveChatHistory: (userId: string) => Promise<void>
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  
  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, message]
    }))
  },

  loadChatHistory: async (userId) => {
    const q = query(collection(db, "chats"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const messages: Message[] = [];
    querySnapshot.forEach((doc) => {
      messages.push(...doc.data().messages);
    });
    set({ messages });
  },

  saveChatHistory: async (userId) => {
    const { messages } = get();
    await addDoc(collection(db, "chats"), {
      userId,
      messages,
      timestamp: new Date()
    });
  }
})) 