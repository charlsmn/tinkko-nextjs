import type { Viewport } from 'next'
import { Toaster } from '@/components/ui/toaster'
import { Inter } from 'next/font/google'
import '@/css/globals.css'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import Header from '@/components/header'
import Sidebar from '@/components/sidebar'

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
                <SessionAuthProvider>
                    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                        <Sidebar />
                        <div className="flex flex-col">
                            <Header />
                            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                                {children}
                            </main>
                        </div>
                    </div>
                </SessionAuthProvider>
                <Toaster />
            </body>
        </html>
    )
}
