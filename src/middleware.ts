import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
        const requestedPage = req.nextUrl.pathname
        const url = req.nextUrl.clone()

        url.pathname = '/login'
        url.search = `p=${requestedPage}`
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/usuarios'],
}
