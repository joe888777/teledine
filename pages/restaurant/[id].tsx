import { useRouter } from 'next/router';
import { restaurants } from '../../data/restaurantData';
import Image from 'next/image';
import Layout from '../../componets/layout';
import { useState } from 'react';

const Toast = ({ message }: { message: string }) => (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
        {message}
    </div>
);

const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const RestaurantPage = () => {
    const [points, setPoints] = useState(15);
    const router = useRouter();
    const { id } = router.query;
    const [showToast, setShowToast] = useState(false);
    const restaurantId = typeof id === 'string' ? id : '';
    const restaurant = restaurants[restaurantId as keyof typeof restaurants];
    const handleCopyAddress = () => {
        navigator.clipboard.writeText(restaurant.address);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const handleTLD = () => {
        setPoints(0);
    }

    if (!restaurant) {
        return <Layout><div>餐廳不存在</div></Layout>;
    }

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
                <Image src={restaurant.image} alt={restaurant.name} width={500} height={300} className="mb-4 rounded-lg" />
                <div className="mb-2">
                    <strong>錢包地址：</strong>
                    <span>{shortenAddress(restaurant.address)}</span>
                    <button
                        onClick={handleCopyAddress}
                        className="points-system"
                    >
                        複製
                    </button>
                </div>
                <p className="mb-2"><strong>類型：</strong> {restaurant.cuisine}</p>
                <p className="mb-2"><strong>評分：</strong> {restaurant.rating} / 5</p>
                <p className="mb-2"><strong>價位：</strong> {restaurant.price}</p>
                <p className="mb-4">{restaurant.description}</p>
                <h2 className="text-2xl font-semibold mb-2">招牌菜品：</h2>
                <ul className="list-disc pl-5 mb-4">
                    {restaurant.signature.map((dish, index) => (
                        <li key={index}>{dish}</li>
                    ))}
                </ul>
                <div className="mb-2">
                    <strong>餐廳點數：</strong> {points} 點
                    <div>
                        <button
                            onClick={handleTLD}
                            className="points-system"
                        >
                            將此餐廳點數轉換為 $TLD
                        </button>
                    </div>
                </div>
            </div>
            {showToast && <Toast message="錢包地址已複製" />}
        </Layout>
    );
};

export default RestaurantPage;