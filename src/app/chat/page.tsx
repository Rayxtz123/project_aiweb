import { ChatInterface } from '@/components/ChatInterface'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function ChatPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ChatInterface />
        </div>
      </main>

      <Footer />
    </div>
  )
} 