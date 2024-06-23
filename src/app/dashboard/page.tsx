'use client'
import { signOut } from 'next-auth/react'

export default function Dashboard() {
    return <button onClick={() => signOut()}>Cerrar sesión</button>
}
