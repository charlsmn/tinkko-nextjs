'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useEffect } from 'react'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'

type Inputs = {
    email: string
    password: string
}

export default function LoginForm() {
    const { data: session, status } = useSession()
    console.log({ session, status })

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const router = useRouter()

    useEffect(() => {
        if (status === 'authenticated') {
            router.push('/')
        }
    }, [status, router])

    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const res = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false,
        })

        setIsLoading(false)
        if (res?.error) {
            toast({
                title: 'Error',
                description: res.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Login exitoso',
                description: 'Has iniciado sesión exitosamente',
            })

            router.push('/dashboard')
        }
    })

    return (
        <form action="" onSubmit={onSubmit}>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...register('email', {
                            required: {
                                value: true,
                                message: 'Escribe tu email',
                            },
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Escribe un email válido',
                            },
                        })}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-xs">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Contraseña</Label>
                        <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        {...register('password', {
                            required: {
                                value: true,
                                message: 'Escribe una contraseña',
                            },
                        })}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-xs">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                        <Loader className="animate-spin h-5 w-5" />
                    ) : (
                        'Iniciar sesión'
                    )}
                </Button>

                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </div>
        </form>
    )
}
