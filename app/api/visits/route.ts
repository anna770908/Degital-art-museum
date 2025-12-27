import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'
import { auth } from '../../../auth'

export async function GET() {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .eq('user_id', session.user.id)
      .order('date', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch visits' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { museum, exhibition, artwork, artist, postcard, review } = body

    const { data, error } = await supabase
      .from('visits')
      .insert({
        id: Date.now().toString(),
        museum,
        exhibition,
        artwork,
        artist,
        postcard,
        review,
        date: new Date().toISOString(),
        user_id: session.user.id
      })
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add visit' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
  }

  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 })
    }

    const { error } = await supabase
      .from('visits')
      .delete()
      .eq('id', id)
      .eq('user_id', session.user.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete visit' }, { status: 500 })
  }
}