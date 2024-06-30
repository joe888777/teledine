import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../componets/layout';
import logo_icon from '../assets/images/logo.jpg';
import { stringToBytes, stringToHex } from 'viem';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi';
import swapAbi from '../core/swap_abi.json';
import erc20Abi from '../core/erc20_abi.json';

const Home: NextPage = () => {
  const router = useRouter();

  const handlePointsSystemClick = () => {
    router.push('/pointsSystem');
  };

  const handleRestaurantClick = (restaurant: string) => {
    router.push(`/restaurant/${restaurant}`);
  };
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
    <Layout>
      <Head>
        <title>TeleDine</title>
        <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <button className="points-system" onClick={handlePointsSystemClick}>
          My $TLD coins
        </button>
        <h2>Choose The Restaurant!</h2>
        <div className="restaurant-grid">
          <button className="restaurant-button" onClick={() => handleRestaurantClick('A')}>餐廳 A</button>
          <button className="restaurant-button" onClick={() => handleRestaurantClick('B')}>餐廳 B</button>
          <button className="restaurant-button" onClick={() => handleRestaurantClick('C')}>餐廳 C</button>
          <button className="restaurant-button" onClick={() => handleRestaurantClick('D')}>餐廳 D</button>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
