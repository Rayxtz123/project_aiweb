/**
 * 聊天消息接口
 * @interface Message
 */
export interface Message {
  /** 消息发送者的角色 */
  role: 'user' | 'assistant'
  /** 消息内容 */
  content: string
}

/**
 * 聊天会话接口
 * @interface ChatSession
 */
export interface ChatSession {
  /** 会话唯一标识符 */
  id: string
  /** 会话中的消息列表 */
  messages: Message[]
  /** 会话创建时间 */
  createdAt: Date
  /** 会话最后更新时间 */
  updatedAt: Date
} 