function NotFound() {

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <p className="text-6xl md:text-7xl text-red-700 font-bold font-mono mb-4">
                404
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold mb-2 text-gray-800">
                Page Not Found
            </h1>
            <p className="text-gray-600 text-center mb-6 max-w-md">
                Oops! The page you are looking for doesn’t exist or has been moved.
            </p>
        </div>
    );
}

export default NotFound;
