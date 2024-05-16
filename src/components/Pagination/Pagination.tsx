function Pagination({
  pageNo,
  endPageNo,
  onChangePage,
}: {
  pageNo: number;
  endPageNo: number;
  onChangePage: (e: React.MouseEvent<HTMLButtonElement>, num: number) => void;
}) {
  return (
    <div className="flex mt-10 mb-20 items-center justify-center gap-1">
      {Array(endPageNo)
        .fill(0)
        .map((_, idx) => (
          <button
            key={idx}
            className={`flex items-center justify-center w-8 h-8 text-sm rounded text-slate-500 border ${idx + 1 === pageNo ? 'border-slate-400 font-semibold' : 'border-transparent hover:bg-slate-200/60'}`}
            onClick={e => onChangePage(e, idx + 1)}
          >
            <span>{idx + 1}</span>
          </button>
        ))}
    </div>
  );
}

export default Pagination;
