"use client";

import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Image from "next/image"

export default function Header() {
    const { user, isLoaded } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className='flex flex-col md:flex-row justify-between items-center py-4 px-7 border-b w-full'>
            <div className='container mx-auto flex justify-between items-center w-full'>
                <Link className='text-2xl font-bold flex items-center gap-2' href='/'>
                    <Image src="/images/camera.png" alt="Logo" className='h-6 w-6 mr-2' width={350} height={350} />
                    Picsify
                </Link>

                <div className='hidden md:flex gap-5 items-center'>
                    {isLoaded && !user && (
                        <>
                            <Link href='/signup'>Sign up</Link>
                            <Link href='/signin'>Sign in</Link>
                        </>
                    )}
                    {isLoaded && user && (
                        <>
                            <Link href='/restore'>Restore</Link>
                            <Link href='/buycredits'>Buy Credits</Link>
                            <UserButton afterSignOutUrl='/' />
                        </>
                    )}
                </div>

                <div className='md:hidden flex items-center'>
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className='md:hidden flex flex-col items-center gap-5 mt-4'>
                    {isLoaded && !user && (
                        <>
                            <Link href='/signup' className='block text-center w-full' onClick={closeMenu}>Sign up</Link>
                            <Link href='/signin' className='block text-center w-full' onClick={closeMenu}>Sign in</Link>
                        </>
                    )}
                    {isLoaded && user && (
                        <>
                            <Link href='/restore' className='block text-center w-full' onClick={closeMenu}>Restore</Link>
                            <Link href='/buycredits' className='block text-center w-full' onClick={closeMenu}>Buy Credits</Link>
                            <div className='block text-center w-full'>
                                <UserButton afterSignOutUrl='/' />
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
