interface SpinnerProps {
  message?: string;
  size?: string;
}

function Spinner({ message = 'Loading data...', size = 'h-12 w-12' }: SpinnerProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors">
      <div className="text-center">
        <div className={`animate-spin rounded-full ${size} border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4`}></div>
        <p className="text-gray-600 dark:text-gray-300">{message}</p>
      </div>
    </div>
  );
}

export default Spinner;

