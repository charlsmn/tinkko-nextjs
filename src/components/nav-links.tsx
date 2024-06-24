'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { DataNavlinks } from '@/components/data-nav-links'

export default function NavLinks() {
    const pathname = usePathname()
    return (
        <>
            {DataNavlinks.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                            {
                                'bg-muted': pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="h-4 w-4" />

                        {link.name}
                    </Link>
                )
            })}
        </>
    )
}
