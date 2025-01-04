'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export function Header() {
  const pathname = usePathname()
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold tracking-tight hover:text-gray-600 transition-colors">
            <div className="relative w-6 h-6">
              <Image 
                src="/favicon.png"
                alt="RayX Logo"
                fill
                sizes="24px"
                priority
                className="object-contain"
              />
            </div>
            <span>RayX</span>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link 
              href="/chat"
              className={`text-sm font-medium hover:text-gray-600 transition-colors ${
                pathname === '/chat' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              AI 对话
            </Link>
            <Link 
              href="/image"
              className={`text-sm font-medium hover:text-gray-600 transition-colors ${
                pathname === '/image' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              图片重命名
            </Link>
            <Link 
              href="/pdf"
              className={`text-sm font-medium hover:text-gray-600 transition-colors ${
                pathname === '/pdf' ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              PDF 操作
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
} 