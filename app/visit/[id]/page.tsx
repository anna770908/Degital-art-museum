'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
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

export default function VisitDetail() {
  const params = useParams()
  const router = useRouter()
  const [visit, setVisit] = useState<Visit | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('visits')
    if (saved) {
      const visits = JSON.parse(saved)
      const foundVisit = visits.find((v: Visit) => v.id === params.id)
      setVisit(foundVisit || null)
    }
  }, [params.id])

  const explain = async () => {
    if (!visit) return
    setLoading(true)
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `${visit.museum} ${visit.exhibition} ${visit.artwork} ${visit.artist}` }),
      })
      const data = await res.json()
      if (data.explanation) {
        alert(data.explanation)
      } else {
        alert('説明を取得できませんでした')
      }
    } catch (error) {
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  if (!visit) {
    return (
      <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <Link href="/">
          <button className="fixed top-6 right-6 bg-black text-white p-4 rounded-full text-2xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 z-10" aria-label="戻る">
            ←
          </button>
        </Link>
        <div className="max-w-4xl mx-auto text-center">
          <p>訪問が見つかりません</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <Link href="/">
        <button className="fixed top-6 right-6 bg-black text-white p-4 rounded-full text-2xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 z-10" aria-label="戻る">
          ←
        </button>
      </Link>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-3xl font-bold mb-6">{visit.museum}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">詳細情報</h2>
              <p className="mb-2"><span className="font-semibold">展示:</span> {visit.exhibition}</p>
              <p className="mb-2"><span className="font-semibold">作品:</span> {visit.artwork}</p>
              <p className="mb-2"><span className="font-semibold">作家:</span> {visit.artist}</p>
              <p className="mb-4"><span className="font-semibold">訪問日:</span> {new Date(visit.date).toLocaleDateString()}</p>
              <button
                onClick={explain}
                disabled={loading}
                className="w-full px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? '読み込み中...' : '説明'}
              </button>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">感想</h2>
              <p className="text-gray-700 leading-relaxed">{visit.review}</p>
              {visit.postcard && (
                <div className="mt-6">
                  <Image
                    src={visit.postcard}
                    alt="Postcard"
                    width={400}
                    height={300}
                    className="w-full rounded-xl shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}