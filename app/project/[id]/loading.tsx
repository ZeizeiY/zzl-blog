export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* 加载动画 */}
        <div className="relative h-12 w-12">
          {/* 外圈 */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
        </div>
        {/* 加载文字 */}
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}
