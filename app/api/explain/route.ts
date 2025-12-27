import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: Request) {
  const { query } = await request.json();
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'あなたは美術の専門家です。ユーザーが提供した美術館、展示、作品、作家についての情報を基に、わかりやすく魅力的な説明を提供してください。'
        },
        {
          role: 'user',
          content: `「${query}」について説明してください。`
        }
      ],
      max_tokens: 500
    });

    const explanation = completion.choices[0]?.message?.content || '説明を取得できませんでした。';
    return Response.json({ explanation });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return Response.json({ error: 'Failed to get explanation' }, { status: 500 });
  }
}