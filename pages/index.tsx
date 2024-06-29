import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import logo_icon from '../assets/images/logo.jpg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '../componets/layout';

const Home: NextPage = () => {
  const router = useRouter();

  const handleRestaurantClick = (restaurant: string) => {
    router.push(`/restaurant/${restaurant}`);
  };

  return (
    <Layout>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      {/* <div>
        <div className="container header-content">
          <div className="logo-container">
            <a href="#/" className="logo-link">
              <Image src={logo_icon} alt="TeleDine Logo" className="logo-image" width={50} height={50}/>
            </a>
            <h1>TeleDine</h1>
          </div>
          <ConnectButton />
        </div>
      </div> */}
      <main>
        <div className="points-system">Points System</div>
        <h2>Choose The Restaurant !</h2>
        <div className="restaurant-grid">
          <button className="restaurant-button" onClick={() => handleRestaurantClick('A')}>餐廳 A</button>
          <button className="restaurant-button" onClick={() => handleRestaurantClick('B')}>餐廳 B</button>
          <button className="restaurant-button" onClick={() => handleRestaurantClick('C')}>餐廳 C</button>
          <button className="restaurant-button" onClick={() => handleRestaurantClick('D')}>餐廳 D</button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Food Blog. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Home;
