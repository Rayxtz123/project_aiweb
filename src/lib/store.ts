import { create } from 'zustand'
import { Message, ChatSession } from '@/types/chat'

/**
 * 聊天状态管理接口
 * @interface ChatStore
 */
interface ChatStore {
  /** 所有聊天会话列表 */
  sessions: ChatSession[]
  /** 当前活动的聊天会话 */
  currentSession: ChatSession | null
  /** 当前会话的消息列表 */
  messages: Message[]
  /** 添加新消息的方法 */
  addMessage: (message: Message) => void
  /** 创建新会话的方法 */
  createNewSession: () => void
}

/**
 * 使用 Zustand 创建全局状态管理
 * @description 管理聊天会话和消息的状态
 */
export const useChatStore = create<ChatStore>((set) => ({
  sessions: [],
  currentSession: null,
  messages: [],
  
  /**
   * 添加新消息到当前会话
   * @param message - 要添加的新消息
   */
  addMessage: (message: Message) => 
    set((state) => {
      const newMessages = [...state.messages, message]
      // 如果存在当前会话,更新会话信息
      if (state.currentSession) {
        const updatedSession = {
          ...state.currentSession,
          messages: newMessages,
          updatedAt: new Date()
        }
        return {
          messages: newMessages,
          currentSession: updatedSession,
          sessions: state.sessions.map(s => 
            s.id === updatedSession.id ? updatedSession : s
          )
        }
      }
      return { messages: newMessages }
    }),

  /**
   * 创建新的聊天会话
   */
  createNewSession: () => {
    const newSession = {
      id: Date.now().toString(),
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    }
    set(state => ({
      currentSession: newSession,
      messages: [],
      sessions: [...state.sessions, newSession]
    }))
  }
})) 