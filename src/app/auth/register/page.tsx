import Link from 'next/link'
import { useForm } from 'react-hook-form'

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

export default function RegisterForm() {
    const { register } = useForm()

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Resitrarse</CardTitle>
                    <CardDescription>
                        Ingresa tu información para crear una cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">Nombre</Label>
                                <Input
                                    id="first-name"
                                    placeholder="Max"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name">Apellido</Label>
                                <Input
                                    id="last-name"
                                    placeholder="Robinson"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" />
                        </div>
                        <Button type="submit" className="w-full">
                            Crear cuenta
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        ¿Ya tienes una cuenta?{' '}
                        <Link href="#" className="underline">
                            Iniciar sesión
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
