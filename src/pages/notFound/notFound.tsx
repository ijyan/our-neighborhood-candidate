import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[600px]">
      <div className="text-center px-6 py-8 mx-6 border-t border-t-green-500 border-b border-b-gray-300 md:px-10 md:py-16 md:mx-0">
        <p className="text-xl md:text-3xl font-semibold">
          페이지를
          <span className="text-green-500"> 찾을 수 없습니다.</span>
        </p>
        <div className="mt-6 text-sm text-gray-500">
          <p>
            방문하시려는 페이지의 주소가 잘못 입력되었거나, 페이지의 주소가 변경
            혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
          </p>
          <p className="mt-3 text-green-500 hidden md:block">
            입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            className="flex justify-center items-center text-sm text-gray-800 border border-gray-200 md:h-12 h-10 rounded-lg md:min-w-28 w-20"
            onClick={() => navigate(-1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              className="hidden md:block rotate-180"
            >
              <path
                fill="#1f2937"
                d="M9.783 17.566 8.65 16.434 13.086 12 8.65 7.566l1.132-1.132L15.349 12l-5.566 5.566Z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
            <span className="md:pr-3">이전</span>
          </button>
          <button
            className="flex justify-center items-center text-sm text-white bg-green-500 md:h-12 rounded-lg md:min-w-28 w-20 ml-2"
            onClick={() => navigate('/')}
          >
            홈
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
