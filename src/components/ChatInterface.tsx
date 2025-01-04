'use client'

import { useState, useRef } from 'react'
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
  const [isComposing, setIsComposing] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 添加一个状态来跟踪最后一次按键时间
  const lastKeyDownTime = useRef(0)
  const lastKeyUpTime = useRef(0)

  /**
   * 处理消息提交
   * @param e - 表单提交事件
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    lastKeyDownTime.current = Date.now()
    
    // 如果是移动设备的换行键，不做任何处理
    if (e.key === 'Enter' && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      e.stopPropagation() // 阻止事件冒泡
      return // 直接返回，不做任何处理
    }

    // 桌面端的 Shift + Enter 换行处理
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault()
        handleSubmit(e)
      }
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    lastKeyUpTime.current = Date.now()
    
    // 检测是否是移动端的快速按键（通常是输入法的换行键）
    const isQuickPress = lastKeyUpTime.current - lastKeyDownTime.current < 50
    
    // 如果是移动端的快速按键，且内容以换行符结尾，移除换行符
    if (isQuickPress && /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
      const value = textareaRef.current?.value || ''
      if (value.endsWith('\n')) {
        setInput(value.slice(0, -1))
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
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
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            placeholder="输入消息... (移动端双击换行键换行，桌面端按 Shift + Enter 换行)"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 self-end ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isLoading}
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
        </div>
      </form>
    </div>
  )
} 