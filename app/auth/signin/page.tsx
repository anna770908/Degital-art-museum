'use client'

import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold text-center mb-6">My Museum Journal</h1>
        <p className="text-center mb-6 text-gray-600">Googleアカウントでログイン</p>
        <button
          onClick={() => signIn('google')}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Googleでログイン
        </button>
      </div>
    </main>
  )
}