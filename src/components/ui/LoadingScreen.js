import { LoadingSpinner } from "./LoadingSpinner";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <LoadingSpinner size="lg" variant="dots" />
    </div>
  );
};
export default LoadingScreen;
