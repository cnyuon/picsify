// components/Footer.tsx
"use client"
import Link from 'next/link';

const Footer = () => {
    return (
        <div className="footer border-t py-6 mt-10 w-full text-center">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} Picsify. All rights reserved.
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link href="/restore">
                        <a className="text-gray-600 hover:text-gray-800">Restore</a>
                    </Link>
                    <Link href="/buycredits">
                        <a className="text-gray-600 hover:text-gray-800">Buy Credits</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;
