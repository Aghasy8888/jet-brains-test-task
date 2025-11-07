interface ErrorModalProps {
  message: string;
  onRetry?: () => void;
  title?: string;
}

function ErrorModal({ 
  message, 
  onRetry = () => window.location.reload(), 
  title = 'Error' 
}: ErrorModalProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
      <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md transition-colors">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorModal;

