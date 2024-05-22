import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ICommonWinnerProps, IWinnerInfo } from '@/types';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';
import useAxios from '@/hooks/useAxios.ts';
import CitySelector from '@/components/Select/CitySelector.tsx';
import Pagination from '@/components/Pagination/Pagination.tsx';
import { Helmet } from 'react-helmet-async';
import SkeletonElections from '@/components/Skeleton/SkeletonElections.tsx';

function Elections({
  pageNo,
  numOfRows,
  sgId,
  sgTypecode,
  sggName,
  sdName,
  pageTitle,
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

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - 우리동네일꾼`}</title>
      </Helmet>
      {location.pathname.includes('presidential') ? (
        <div className="text-gray-600 text-right pb-3 md:pb-6">
          전체 <span className="font-semibold">{state.totalCount}</span>건
        </div>
      ) : (
        <div className="md:flex md:justify-between md:items-center pb-3 md:pb-6">
          <CitySelector sdName={sdName || ''} sggName={sggName || ''} />
          <div className="pt-3 md:pt-0 text-gray-600 text-right">
            전체 <span className="font-semibold">{state.totalCount}</span>건
          </div>
        </div>
      )}
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {loading
          ? Array.from({ length: numOfRows }, (_, index) => (
              <SkeletonElections key={index} />
            ))
          : state.data.map(item => (
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
                    <div className="flex flex-col p-5 w-full justify-center">
                      <div>
                        <h3 className="text-2xl pb-1.5 font-semibold md:text-3xl text-gray-700 md:pb-3">
                          {item.name}
                        </h3>
                        <p className="text-gray-500">{item.jdName}</p>
                        <p className="text-gray-500">{item.sggName}</p>
                      </div>
                      <ButtonLink
                        otherStyle="justify-end pt-4"
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
        endPageNo={
          data
            ? Math.ceil(
                data.response.body.totalCount / data.response.body.numOfRows,
              )
            : 0
        }
      />
    </>
  );
}

export default Elections;
