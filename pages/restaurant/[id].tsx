import { useRouter } from 'next/router';
import { restaurants } from '../../data/restaurantData';
import Image from 'next/image';

const RestaurantPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const restaurantId = typeof id === 'string' ? id : '';
    const restaurant = restaurants[restaurantId as keyof typeof restaurants];

    if (!restaurant) {
        return <div>餐廳不存在</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{restaurant.name}</h1>
            <Image src={restaurant.image} alt={restaurant.name} width={500} height={300} className="mb-4 rounded-lg" />
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
        </div>
    );
};

export default RestaurantPage;