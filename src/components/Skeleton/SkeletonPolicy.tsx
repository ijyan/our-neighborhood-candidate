function SkeletonPolicy() {
  return (
    <div
      role="status"
      className="rounded-2xl overflow-hidden border border-[#eff2f6] animate-pulse"
    >
      <div className="flex items-center justify-center w-full h-24 md:h-32 bg-gray-300">
        <svg
          className="w-10 h-10 text-gray-200"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
        </svg>
      </div>
      <div className="p-4 md:p-6">
        <div className="h-2.5 bg-gray-200 rounded-full w-1/2 mb-2" />
        <div className="flex justify-end">
          <div className="h-2 bg-gray-200 rounded-full w-1/3" />
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default SkeletonPolicy;
