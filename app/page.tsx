'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

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

export default function Home() {
  const [visits, setVisits] = useState<Visit[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('visits')
    if (saved) setVisits(JSON.parse(saved))
  }, [])

  const deleteVisit = (id: string) => {
    const updatedVisits = visits.filter(visit => visit.id !== id)
    setVisits(updatedVisits)
    localStorage.setItem('visits', JSON.stringify(updatedVisits))
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extralight text-center text-gray-900 mb-12">My Museum Journal</h1>

        <Link href="/add">
          <button className="fixed top-6 right-6 bg-black text-white p-4 rounded-full text-2xl shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all duration-300 z-10" aria-label="新しい訪問を追加">
            +
          </button>
        </Link>

        <div>
          <h2 className="text-3xl font-extralight text-center mb-8 text-gray-800">訪問履歴</h2>
          {visits.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏛️</div>
              <p className="text-xl text-gray-600 mb-4">まだ訪問がありません</p>
              <p className="text-gray-500">右上の+ボタンから新しい訪問を追加してください</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visits.map(visit => (
                <div key={visit.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer relative">
                  <Link href={`/visit/${visit.id}`}>
                    <div>
                      <h3 className="text-xl font-medium mb-2 text-gray-900">{visit.museum}</h3>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">展示:</span> {visit.exhibition}</p>
                      <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">作品:</span> {visit.artwork}</p>
                      <p className="text-sm text-gray-600 mb-4"><span className="font-semibold">作家:</span> {visit.artist}</p>
                      {visit.postcard && (
                        <Image
                          src={visit.postcard}
                          alt="Postcard"
                          width={400}
                          height={192}
                          className="w-full h-48 object-cover rounded-xl mb-4 shadow-sm"
                        />
                      )}
                      <p className="text-sm mb-4 text-gray-800 leading-relaxed">{visit.review}</p>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (confirm('この訪問を削除しますか？')) {
                        deleteVisit(visit.id)
                      }
                    }}
                    className="absolute top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    aria-label="削除"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}