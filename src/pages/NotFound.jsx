export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center p-4">
            <h1 className="text-6xl font-bold text-red-500">404</h1>
            <p className="text-xl mt-4">Oops! The page you are looking for does not exist.</p>
            <a href="/" className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all">
                Go Back Home
            </a>
        </div>
    );
}