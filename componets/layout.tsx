import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo_icon from '../assets/images/logo.jpg';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <div className="container header-content">
                <div className="logo-container">
                    <Link href="/" className="logo-link">
                        <Image src={logo_icon} alt="TeleDine Logo" className="logo-image" width={50} height={50} />
                    </Link>
                    <h1>TeleDine</h1>
                </div>
                <ConnectButton />
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Layout;