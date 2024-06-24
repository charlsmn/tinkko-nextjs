'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Link from 'next/link'
import { Check, Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'

type Inputs = {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const watchPassword = watch('password')
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const res = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        setIsLoading(false)
        if (res.ok) {
            toast({
                title: 'Usuario creado con éxito',
                description:
                    'Los datos de ingreso fueron enviados al usuario que creaste.',
            })
        } else if (res.status === 409) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Ya existe un usuario con ese correo',
            })
        }
    })

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-xl">Crear usuario</CardTitle>
                <CardDescription>
                    Ingresa la información del nuevo usuario
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" onSubmit={onSubmit}>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="firstName">Nombre</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    placeholder="Max"
                                    {...register('firstName', {
                                        required: {
                                            value: true,
                                            message: 'Escribe tu nombre',
                                        },
                                    })}
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-xs">
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="lastName">Apellido</Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    placeholder="Robinson"
                                    {...register('lastName', {
                                        required: {
                                            value: true,
                                            message: 'Escribe tu apellido',
                                        },
                                    })}
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-xs">
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>
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
                            <Label htmlFor="password">Contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password', {
                                    required: {
                                        value: true,
                                        message: 'Escribe una contraseña',
                                    },
                                    minLength: {
                                        value: 6,
                                        message:
                                            'La contraseña debe tener al menos 6 caracteres',
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!#%*?&]{6,}$/,
                                        message:
                                            'La contraseña debe tener al menos una mayúscula, una minúscula y un número.',
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="confirmPassword">
                                Confirmar Contraseña
                            </Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                {...register('confirmPassword', {
                                    required: {
                                        value: true,
                                        message: 'Confirma tu contraseña',
                                    },
                                    validate: (value) =>
                                        value === watchPassword ||
                                        'Las contrasenias no coinciden',
                                })}
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-xs">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader className="animate-spin h-5 w-5" />
                            ) : (
                                'Crear cuenta'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
