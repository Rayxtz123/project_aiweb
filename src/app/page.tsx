import Link from 'next/link'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RayX - 主页'
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto pt-24 pb-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <h1 className="text-6xl font-bold tracking-tight text-center mb-8">
              RayX
            </h1>
            <p className="text-xl text-gray-500 text-center max-w-2xl mb-16">
              探索 AI 的无限可能，让科技改变生活
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
              <Link 
                href="/chat"
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden p-6 flex flex-col items-center"
              >
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">AI 对话</h3>
                <p className="text-gray-500 text-center">与 AI 进行自然对话，获取智能解答</p>
              </Link>

              <Link 
                href="/image"
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden p-6 flex flex-col items-center"
              >
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">图片重命名</h3>
                <p className="text-gray-500 text-center">智能图片批量重命名，提高工作效率</p>
              </Link>

              <Link 
                href="/pdf"
                className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden p-6 flex flex-col items-center"
              >
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">PDF 操作</h3>
                <p className="text-gray-500 text-center">PDF 文件处理，轻松管理文档</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
