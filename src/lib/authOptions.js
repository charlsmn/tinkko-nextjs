import CredentialsProvider from 'next-auth/providers/credentials'
import db from '@/lib/db'
import bcrypt from 'bcrypt'

// interface Token {
//     id: string
//     email: string
//     name: string
//     lastName: string
// }

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                if (!credentials) throw new Error('Credenciales incorrectas')

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

                if (!matchPassword) throw new Error('Contraseña incorrecta')

                return {
                    id: userFound.id.toString(),
                    email: userFound.email,
                    name: userFound.firstName,
                    lastName: userFound.lastName,
                }
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token
            return session
        },
    },
}
