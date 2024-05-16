import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ICommonWinnerProps, IWinnerInfo } from '@/types';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';
import useAxios from '@/hooks/useAxios.ts';
import CitySelector from '@/components/Select/CitySelector.tsx';
import Pagination from '@/components/Pagination/Pagination.tsx';

function Elections({
  pageNo,
  numOfRows,
  sgId,
  sgTypecode,
  sggName,
  sdName,
}: ICommonWinnerProps) {
  const [state, setState] = useState<{
    data: IWinnerInfo[];
    totalCount: number;
    numOfRows: number;
  }>({
    data: [],
    totalCount: 0,
    numOfRows: 0,
  });

  // 현재 url 받아옴
  const location = useLocation();

  // 데이터 가져오기
  const { data, error, loading } = useAxios<IWinnerInfo>({
    url: `/WinnerInfoInqireService2/getWinnerInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}&sgTypecode=${sgTypecode}&sggName=${sggName}&sdName=${sdName}`,
    method: 'get',
  });

  useEffect(() => {
    if (data) {
      const res = data.response.body.items.item;
      const total = data.response.body.totalCount;
      const rows = data.response.body.numOfRows;
      const updatedImages = res.map((item: IWinnerInfo) => {
        return {
          ...item,
          image: `../../../src/assets/person/${item.huboid}.jpg`,
        };
      });
      setState(prev => ({
        ...prev,
        data: updatedImages,
        totalCount: total,
        numOfRows: rows,
      }));
      if (pageNo > Math.ceil(total / numOfRows)) {
        setState({
          data: [],
          totalCount: 0,
          numOfRows: 0,
        });
      }
    }
  }, [data, numOfRows, pageNo]);

  // 페이징
  const [, setQuery] = useSearchParams();
  const handleChangePageClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    num: number,
  ) => {
    // 클릭 시 페이지 이동
    e.preventDefault();
    const params: Record<string, string> = {
      pageNo: num.toString(),
    };

    if (sdName !== undefined) {
      params.sdName = sdName;
    }

    if (sggName !== undefined) {
      params.sggName = sggName;
    }

    setQuery(params);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <>
      <div className="flex justify-between items-center pb-6">
        <CitySelector sdName={sdName || ''} sggName={sggName || ''} />
        <div className="text-gray-600 text-right">
          전체 <span className="font-semibold">{state.totalCount}</span>건
        </div>
      </div>
      {state.data.length ? (
        <>
          <ul className="grid grid-cols-3 gap-8">
            {state.data.map(item => (
              <li
                key={item.huboid}
                className="rounded-2xl overflow-hidden bg-white hover:bg-[#f3f4f8] transition"
              >
                <Link
                  to={`${location.pathname}/detail?sdName=${item.sdName}&sggName=${item.sggName}`}
                >
                  <div className="flex p-3">
                    <div className="aspect-3/4 flex justify-center items-center overflow-hidden w-full rounded-xl">
                      <ImgLoad url={item.image} alt={item.name} />
                    </div>
                    <div className="flex flex-col justify-between p-5 w-full">
                      <div>
                        <h3 className="text-3xl text-gray-700 pb-3">
                          {item.name}
                        </h3>
                        <p className="text-gray-500">{item.jdName}</p>
                        <p className="text-gray-500">{item.sggName}</p>
                      </div>
                      <ButtonLink
                        otherStyle="justify-end"
                        label="상세보기"
                        size="sm"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination
            onChangePage={handleChangePageClick}
            pageNo={pageNo}
            endPageNo={Math.ceil(state.totalCount / state.numOfRows)}
          />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center gap-5 py-24">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 58.99 53.91"
            width="48"
            height="48"
          >
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="report">
                  <path
                    fill="#d1d5db"
                    d="M39,53.91H20a10.54,10.54,0,0,1-9.1-5.25L1.4,32.21a10.55,10.55,0,0,1,0-10.51L10.9,5.25A10.54,10.54,0,0,1,20,0H39a10.54,10.54,0,0,1,9.1,5.25l9.5,16.45a10.55,10.55,0,0,1,0,10.51l-9.5,16.45A10.54,10.54,0,0,1,39,53.91ZM20,5a5.52,5.52,0,0,0-4.77,2.75L5.73,24.2a5.53,5.53,0,0,0,0,5.51l9.5,16.45A5.54,5.54,0,0,0,20,48.91H39a5.54,5.54,0,0,0,4.77-2.75l9.5-16.45a5.53,5.53,0,0,0,0-5.51L43.76,7.75A5.52,5.52,0,0,0,39,5Z"
                  />
                  <path
                    fill="#d1d5db"
                    d="M29.49,31.5A2.5,2.5,0,0,1,27,29V15a2.5,2.5,0,0,1,5,0V29A2.49,2.49,0,0,1,29.49,31.5Z"
                  />
                  <path
                    fill="#d1d5db"
                    d="M29.49,41.45A2.5,2.5,0,0,1,27,39V37.78a2.5,2.5,0,0,1,5,0V39A2.49,2.49,0,0,1,29.49,41.45Z"
                  />
                </g>
              </g>
            </g>
          </svg>
          <span className="text-gray-400">데이터가 없습니다.</span>
        </div>
      )}
    </>
  );
}

export default Elections;
