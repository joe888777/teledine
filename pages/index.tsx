import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import logo_icon from '../assets/images/logo.jpg';
import { stringToBytes, stringToHex } from 'viem';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi';

import swapAbi from '../core/swap_abi.json';
import erc20Abi from '../core/erc20_abi.json';
import Image from 'next/image';

const Home: NextPage = () => {
  const { address, isConnected } = useAccount()
  const { data: hash, writeContract, writeContractAsync } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const targetAmount = 100000;

  const _swapAmount = useReadContract({
    abi: swapAbi,
    address: '0xFceE0eeC37525C703b443930aD30ADce811d9a6e',
    functionName: 'getAmountIn',
    args: [targetAmount]
  })
  console.log("swapAmount", _swapAmount.data);

  const msleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const handleClick = async () => {
    if (!address) {
      console.log("address not ");
      return;

    } 
    const recipientBytes = stringToBytes(address);
    console.log("address", address);
    const resp = await writeContractAsync({
      address: '0xFceE0eeC37525C703b443930aD30ADce811d9a6e',
      abi: swapAbi,
      functionName: 'swap',
      args: [
        _swapAmount.data,
        address,
      ],
      account: address,

    })
    console.log("resp", resp);
    // for (;isConfirmed;) {
    //   console.log("Pending...");
    //   await msleep(1000);
    // }
    // alert(hash);
  }

  const handleApprove = async () => {
    writeContract({
      address: '0x657296a72483F8F330287B2F1E20293a2a2C2F52',
      abi: erc20Abi,
      functionName: 'approve',
      args: [
        "0xFceE0eeC37525C703b443930aD30ADce811d9a6e",
        _swapAmount.data,
      ],
      account: address,
    })
  }

  return (
    <div>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <div>
        <div className="container header-content">
          <div className="logo-container">
            <a href="#/" className="logo-link">
              <Image src={logo_icon} alt="TeleDine Logo" className="logo-image" width={50} height={50}/>
            </a>
            <h1>TeleDine</h1>
          </div>
          <ConnectButton />
          <button className="cute-button" onClick={handleClick}>Swap</button>
          <button className="cute-button" onClick={handleApprove}>approve</button>
        </div>
      </div>
      <main>
        <div className="points-system">Points System</div>
        <h2>Choose The Restaurant !</h2>
        <div className="restaurant-grid">
          <button className="restaurant-button" data-restaurant="A">餐廳 A</button>
          <button className="restaurant-button" data-restaurant="B">餐廳 B</button>
          <button className="restaurant-button" data-restaurant="C">餐廳 C</button>
          <button className="restaurant-button" data-restaurant="D">餐廳 D</button>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Food Blog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
