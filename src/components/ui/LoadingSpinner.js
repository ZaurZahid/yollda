export const LoadingSpinner = ({
  variant = "spinner",
  size = "md",
  message,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const dotSizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      {variant === "dots" ? (
        <div className="flex space-x-1">
          <div
            className={`${dotSizeClasses[size]} bg-emerald-500 rounded-full animate-bounce`}
          ></div>
          <div
            className={`${dotSizeClasses[size]} bg-emerald-500 rounded-full animate-bounce`}
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className={`${dotSizeClasses[size]} bg-emerald-500 rounded-full animate-bounce`}
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      ) : (
        <div
          className={`${sizeClasses[size]} border-2 border-gray-200 border-t-emerald-500 rounded-full animate-spin`}
        ></div>
      )}

      {message && (
        <p className="text-gray-600 text-sm font-medium text-center">
          {message}
        </p>
      )}
    </div>
  );
};
