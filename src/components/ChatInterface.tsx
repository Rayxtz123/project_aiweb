'use client'

import { useState } from 'react'
import { useChatStore } from '@/lib/store'
import { Message } from '@/types/chat'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

/**
 * ChatInterface 组件
 * @description 主要的聊天界面组件,处理用户输入和消息显示
 * @component
 */
export function ChatInterface() {
  // 用户输入状态管理
  const [input, setInput] = useState('')
  // 加载状态
  const [isLoading, setIsLoading] = useState(false)
  // 从全局状态获取消息列表和添加消息的方法
  const { messages, addMessage } = useChatStore()

  /**
   * 处理消息提交
   * @param e - 表单提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // 创建并添加用户消息
    const userMessage: Message = {
      role: 'user',
      content: input
    }
    addMessage(userMessage)
    setInput('') // 清空输入框
    setIsLoading(true) // 设置加载状态

    try {
      // 发送消息到 API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage] 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // 添加 AI 响应消息
      const aiMessage: Message = {
        role: 'assistant',
        content: data.message
      }
      addMessage(aiMessage)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsLoading(false) // 重置加载状态
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col h-[80vh]">
      {/* 标题 */}
      <div className="text-center py-3 border-b">
        <h1 className="text-2xl font-bold">RayX的AI</h1>
      </div>

      {/* 消息显示区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <ReactMarkdown
                className="prose prose-sm max-w-none"
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
                components={{
                  // 移除未使用的 node 参数
                  p: ({ children }) => <p className="my-1">{children}</p>,
                  // 移除未使用的 node 参数
                  pre: ({ children }) => <pre className="bg-gray-800 text-white p-2 rounded">{children}</pre>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {/* 加载状态显示 */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[80%]">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* 消息输入表单 */}
      <form onSubmit={handleSubmit} className="p-3 border-t">
        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  )
} 