const SkeletonLoader = () => {
  return (
    <div className="relative w-screen h-screen bg-gray-800 text-white flex items-center justify-center">
      <div
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 opacity-25"
        style={{ width: "500px", height: "500px" }}
      />

      <div className="relative w-full max-w-md bg-gray-900 shadow-lg rounded-lg p-6 mx-16 animate-pulse">
        <div className="h-8 bg-gray-700 rounded mb-4"></div>

        <div className="mb-6">
          <div className="h-5 bg-gray-700 rounded mb-2 w-20"></div>
          <div className="flex items-center space-x-3">
            <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
            <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
        </div>

        <div className="mb-6">
          <div className="h-5 bg-gray-700 rounded mb-2 w-20"></div>
          <div className="flex items-center space-x-3">
            <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
            <div className="h-12 bg-gray-700 rounded-lg w-full"></div>
          </div>
        </div>

        <div className="w-full h-12 bg-gray-700 rounded-lg mb-6"></div>
      </div>

      <div
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 opacity-25"
        style={{ width: "500px", height: "500px" }}
      />
    </div>
  );
};

export default SkeletonLoader;
