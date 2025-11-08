interface NoDataMessageProps {
  dataName?: string;
}

function NoDataMessage({ dataName }: NoDataMessageProps) {
  return (
    <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
      No {dataName || 'data'} available
    </div>
  );
}

export default NoDataMessage;
