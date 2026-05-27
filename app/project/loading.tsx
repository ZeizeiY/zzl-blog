export default function Loading() {
  return (
    <div className="mx-auto max-w-[1500px] px-4 py-12">
      {/* 标题骨架 */}
      <div className="mb-10 h-9 w-80 animate-pulse rounded bg-gray-200" />

      {/* 筛选骨架 */}
      <div className="mb-8 flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="h-14 w-28 animate-pulse rounded bg-gray-200"
          />
        ))}
      </div>

      {/* 项目网格骨架 */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            {/* 图片骨架 */}
            <div className="aspect-[4/3] animate-pulse rounded bg-gray-200" />
            {/* 标题骨架 */}
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-200" />
            {/* 日期骨架 */}
            <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
            {/* 标签骨架 */}
            <div className="flex gap-2">
              <div className="h-5 w-16 animate-pulse rounded bg-gray-200" />
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
