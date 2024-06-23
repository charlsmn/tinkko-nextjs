import { NextResponse } from 'next/server'
import db from '@/lib/db'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const userFound = await db.user.findUnique({
            where: {
                email: data.email,
            },
        })

        if (userFound) {
            return NextResponse.json(
                { message: 'El usuario ya existe' },
                { status: 409 }
            )
        }

        const hashPassword = await bcrypt.hash(data.password, 10)
        const newUser = await db.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashPassword,
            },
        })

        const { password: _, ...user } = newUser

        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
