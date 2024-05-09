function Pagination({
  isMobile,
  pageNo,
  endPageNo,
  onChangePage,
}: {
  isMobile: boolean;
  pageNo: number;
  endPageNo: number;
  onChangePage: (e: React.MouseEvent<HTMLButtonElement>, num: number) => void;
}) {
  const pagesPerPagination = isMobile ? 3 : 5;
  const paginationNum = Math.floor((pageNo - 1) / pagesPerPagination) + 1;
  const lastPaginationNum = Math.floor((pageNo - 1) / pagesPerPagination) + 1;
  console.log(paginationNum, lastPaginationNum);

  return (
    <div className="flex mt-10 mb-20 items-center justify-center gap-1">
      {paginationNum !== 1 && <span>이전</span>}
      {Array(endPageNo)
        .fill(0)
        .map((_, idx) => (
          <button
            key={idx}
            className={`flex items-center justify-center w-8 h-8 text-sm rounded text-slate-500 border ${idx + 1 === pageNo ? 'border-slate-400 font-semibold' : 'border-transparent hover:bg-slate-200'}`}
            onClick={e => onChangePage(e, idx + 1)}
          >
            <span>{idx + 1}</span>
          </button>
        ))}
    </div>
  );
}

export default Pagination;
