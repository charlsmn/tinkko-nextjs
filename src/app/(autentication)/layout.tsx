import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import type { Viewport } from 'next'
import '@/css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionAuthProvider>{children}</SessionAuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
