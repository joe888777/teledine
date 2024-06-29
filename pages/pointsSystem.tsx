import { useRouter } from 'next/router';

const PointsSystem = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-3xl font-bold mb-4">Points System</h2>
      <p>Points System 功能即將推出，敬請期待！</p>
      <button onClick={handleBackClick} className="back-button">
        Back
      </button>
    </div>
  );
};

export default PointsSystem;
