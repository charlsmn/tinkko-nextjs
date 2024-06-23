import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/lib/db'
import bcrypt from 'bcrypt'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const userFound = await db.user.findUnique({
                    where: {
                        email: credentials?.email,
                    },
                })

                if (!userFound) throw new Error('Usuario no encontrado')

                const matchPassword = await bcrypt.compare(
                    credentials.password,
                    userFound.password
                )

                if (!matchPassword) throw new Error('Contraseña incorrecta')

                return {
                    id: userFound.id,
                    email: userFound.email,
                    name: userFound.firstName,
                }
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
