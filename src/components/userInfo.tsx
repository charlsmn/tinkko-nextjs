'use client'
import { useSession } from 'next-auth/react'
export default function UserInfo() {
    const { data: session, status } = useSession()

    console.log({ session, status })
    return (
        <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
                {session?.user?.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email}
            </p>
        </div>
    )
}
