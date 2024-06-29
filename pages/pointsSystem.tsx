import { useRouter } from 'next/router';
import Layout from '../componets/layout';

const PointsSystem = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Layout>
      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-3xl font-bold mb-4">Points System</h2>
        <p>目前擁有 0 $TLD</p>
        <button onClick={handleBackClick} className="trigger-button">
          兌換活動
        </button>
      </div>
    </Layout>
  );
};

export default PointsSystem;
