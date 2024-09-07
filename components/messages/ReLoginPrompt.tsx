
const ReLoginPrompt = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 text-black h-40 p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200">
      <div className="text-center">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
          Please Logout and reLogin to get Benefits Reputation{" "}
          <span className="inline-block text-yellow-500 text-3xl sm:text-4xl">
            🏆
          </span>{" "}
          and Streak{" "}
          <span className="inline-block text-red-500 text-3xl sm:text-4xl">
            🔥
          </span>
        </h3>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mt-2">
          Re-login to refresh your benefits and improve your reputation and
          streak!
        </p>
      </div>
    </div>
  );
}

export default ReLoginPrompt
