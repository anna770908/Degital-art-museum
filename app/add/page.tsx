'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Visit {
  id: string;
  museum: string;
  exhibition: string;
  artwork: string;
  artist: string;
  postcard?: string;
  review: string;
  date: string;
}

export default function AddVisit() {
  const router = useRouter()
  const [form, setForm] = useState({
    museum: '',
    exhibition: '',
    artwork: '',
    artist: '',
    postcard: '',
    review: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const saveVisits = (newVisits: Visit[]) => {
    localStorage.setItem('visits', JSON.stringify(newVisits))
  }

  const addVisit = () => {
    const saved = localStorage.getItem('visits')
    const visits = saved ? JSON.parse(saved) : []
    const newVisit: Visit = {
      id: Date.now().toString(),
      ...form,
      date: new Date().toISOString(),
    }
    saveVisits([...visits, newVisit])
    setForm({ museum: '', exhibition: '', artwork: '', artist: '', postcard: '', review: '' })
    router.push('/')
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => setForm({ ...form, postcard: reader.result as string })
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onload = () => setForm({ ...form, postcard: reader.result as string })
      reader.readAsDataURL(file)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Link href="/">
        <button className="fixed top-6 right-6 bg-black text-white p-4 rounded-full text-2xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 z-10" aria-label="戻る">
          ←
        </button>
      </Link>
      <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">新しい訪問を追加</h1>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">美術館</label>
            <input
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="例: 東京国立博物館"
              value={form.museum}
              onChange={e => setForm({ ...form, museum: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">展示会</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="例: 特別展「日本の美」"
              value={form.exhibition}
              onChange={e => setForm({ ...form, exhibition: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">作品</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="例: 風神雷神図屏風"
              value={form.artwork}
              onChange={e => setForm({ ...form, artwork: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">作家</label>
            <input
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              placeholder="例: 俵屋宗達"
              value={form.artist}
              onChange={e => setForm({ ...form, artist: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">写真（任意）</label>
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('file-input')?.click()}
            >
              {selectedFile ? (
                <div>
                  <p className="text-sm text-gray-600">選択されたファイル: {selectedFile.name}</p>
                  <button
                    type="button"
                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedFile(null)
                      setForm({ ...form, postcard: '' })
                    }}
                  >
                    削除
                  </button>
                </div>
              ) : (
                <div>
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-600">画像をドラッグ&ドロップするか、クリックして選択</p>
                </div>
              )}
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-2">感想</label>
            <textarea
              className="w-full resize-none border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
              rows={4}
              placeholder="この作品の感想や見どころを記入してください"
              value={form.review}
              onChange={e => setForm({ ...form, review: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
            onClick={addVisit}
          >
            訪問を追加
          </button>
        </form>
      </div>
    </main>
  )
}