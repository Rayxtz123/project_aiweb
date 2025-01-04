import { NextResponse } from 'next/server'
import { Message } from '@/types/chat'
import OpenAI from 'openai'

/**
 * OpenAI 客户端配置
 * @description 用于调用 Deepseek API
 */
const client = new OpenAI({
  apiKey: 'sk-082ec64fe60d486eae5bd55238e88795',
  baseURL: 'https://api.deepseek.com/v1'
})

/**
 * 聊天 API 路由处理函数
 * @description 处理聊天请求并返回 AI 响应
 * @param request - HTTP 请求对象
 * @returns NextResponse 包含 AI 响应或错误信息
 */
export async function POST(request: Request) {
  try {
    // 解析请求中的消息
    const { messages } = await request.json()
    
    // 调用 Deepseek API
    const response = await client.chat.completions.create({
      model: 'deepseek-chat',
      messages: messages as Message[],
    })

    // 返回 AI 响应
    return NextResponse.json({
      message: response.choices[0].message.content
    })
    
  } catch (error: any) {
    // 错误处理和日志记录
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process request' },
      { status: 500 }
    )
  }
} 