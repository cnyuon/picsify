// components/Footer.tsx
"use client"
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                    <p className="text-sm">© 2024 Picsify. All rights reserved.</p>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0 gap-4">
                    <Link href="/restore">
                        <p className="text-sm hover:underline">Restore</p>
                    </Link>
                    <Link href="/buy-credits">
                        <p className="text-sm hover:underline">Buy Credits</p>
                    </Link>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
