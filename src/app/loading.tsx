const LoadingSkeleton = () => {
  return (
    <div>
      <div className="animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-3/4 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 my-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 my-2"></div>
      </div>
    </div>
  );
};

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  // return <LoadingSkeleton />
  return <LoadingSkeleton />;
}
