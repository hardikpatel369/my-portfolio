import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const response = await fetch('https://n8n.srv1049963.hstgr.cloud/webhook/07ab07f7-16b3-4305-82ea-98d8928dedc5', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to send message to external webhook' },
                { status: response.status }
            );
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error processing contact form' },
            { status: 500 }
        );
    }
}
