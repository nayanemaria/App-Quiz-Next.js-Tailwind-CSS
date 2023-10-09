'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import DropdownProfile from './DropdownProfile';
import Logo from './Logo';
import { protectedRoutes } from "@/router/routes";

export default function Header() {
    const pathname = usePathname()
    const searchParams = useSearchParams();
    return (
        <>
            {protectedRoutes.includes(pathname) && (<header>
                <div className="flex flex-row justify-between items-center  p-4">
                    <Logo />
                    <div className="flex flex-row gap-3">
                        <DropdownProfile />
                    </div>
                </div>
            </header>)}
        </>
    );
}