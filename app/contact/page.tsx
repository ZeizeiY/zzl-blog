export default function ContactPage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      {/* 建设中图标 */}
      <div className="mb-8 text-gray-300">
        <svg
          className="h-32 w-32"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* 标题 */}
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Contact / 联系</h1>

      {/* 建设中提示 */}
      <span className="relative flex h-3 w-3"></span>

      {/* 描述文字 */}
      <p className="mt-6 max-w-md text-center text-gray-500">
        正在努力完善这个页面，敬请期待...
      </p>
    </div>
  );
}
