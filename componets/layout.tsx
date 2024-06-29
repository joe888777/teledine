import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div className="container header-content">
                <div className="logo-container">
                    <Link href="/" className="logo-link">
                      <Image src="/assets/images/logo.jpg" alt="TeleDine Logo" className="logo-image" width={50} height={50} />
                    </Link>
                    <h1>TeleDine</h1>
                </div>
                <ConnectButton />
            </div>
            <main>{children}</main>
            <footer className="bg-gray-800 text-white p-4 mt-8">
                <div className="container mx-auto text-center">
                  <p>&copy; 2024 TeleDine. All rights reserved.</p>
                </div>
            </footer>
        </div>
        
    );
};

export default Layout;