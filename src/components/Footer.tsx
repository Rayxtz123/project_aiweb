'use client'

import { useState, useRef } from 'react'

export function Footer() {
  const [isOpen, setIsOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const showDialog = () => {
    dialogRef.current?.showModal()
    setIsOpen(true)
  }

  const closeDialog = () => {
    dialogRef.current?.close()
    setIsOpen(false)
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-6">
          {/* Contact Info */}
          <div className="flex space-x-8">
            {/* Email */}
            <a 
              href="mailto:77258368@qq.com"
              className="text-gray-500 hover:text-gray-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>77258368@qq.com</span>
            </a>

            {/* WeChat */}
            <button
              onClick={showDialog}
              className="text-gray-500 hover:text-gray-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.667 18.667c-3.733-1.867-6.4-5.867-6.4-10.667C2.267 3.2 6.667 0 12 0s9.733 3.2 9.733 8c0 4.8-2.667 8.8-6.4 10.667l-1.067 2.133c-.267.533-.8.8-1.333.8h-2.667c-.533 0-1.067-.267-1.333-.8l-1.067-2.133zM12 4c-2.667 0-4.8 1.867-4.8 4.267 0 .533.4.933.933.933s.933-.4.933-.933c0-1.333 1.333-2.4 2.933-2.4s2.933 1.067 2.933 2.4c0 .533.4.933.933.933s.933-.4.933-.933C16.8 5.867 14.667 4 12 4z"/>
              </svg>
              <span>RayX</span>
            </button>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RayX. All rights reserved.
          </div>
        </div>
      </div>

      {/* WeChat QR Code Dialog */}
      <dialog
        ref={dialogRef}
        className="rounded-lg p-6 backdrop:bg-black/30"
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog()
        }}
      >
        <div className="flex flex-col items-center min-w-[300px]">
          <h3 className="text-lg font-medium mb-4">
            扫码添加微信
          </h3>
          
          <img 
            src="/rayx-qr.jpg"
            alt="WeChat QR Code"
            className="w-64 h-64 object-contain"
          />

          <button
            onClick={closeDialog}
            className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            关闭
          </button>
        </div>
      </dialog>
    </footer>
  )
} 