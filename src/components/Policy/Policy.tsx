import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ICommonPartyCode, IPartyCode } from '@/types';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';
import Pagination from '@/components/Pagination/Pagination.tsx';
import useAxios from '@/hooks/useAxios.ts';
import { Helmet } from 'react-helmet-async';
import SkeletonPolicy from '@/components/Skeleton/SkeletonPolicy.tsx';

function Policy({ pageNo, sgId, numOfRows, pageTitle }: ICommonPartyCode) {
  const [state, setState] = useState<{
    data: IPartyCode[];
    totalCount: number;
    numOfRows: number;
  }>({
    data: [],
    totalCount: 0,
    numOfRows: 0,
  });
  const location = useLocation();

  // 데이터 가져오기
  const { data, error, loading } = useAxios<IPartyCode>({
    url: `/CommonCodeService/getCommonPartyCodeList?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}`,
    method: 'get',
  });

  useEffect(() => {
    // 데이터 가져오기
    if (data) {
      const res = data.response.body.items.item;
      const total = data.response.body.totalCount;
      const rows = data.response.body.numOfRows;
      const updatedImages = res.map((item: IPartyCode) => {
        return {
          ...item,
          image: `../../../src/assets/party/${item.jdName}.png`,
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

    setQuery(params);
    window.scrollTo({ top: 0 });
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Helmet>
        <title>{`${pageTitle} - 우리동네일꾼`}</title>
      </Helmet>
      <div className="block text-gray-600 text-sm pb-3 md:text-base md:pb-6 text-right">
        전체 {data ? data.response.body.totalCount : 0}건
      </div>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 lg:gap-8">
        {loading
          ? Array.from({ length: numOfRows }, (_, index) => (
              <SkeletonPolicy key={index} />
            ))
          : state.data.map(item => (
              <li
                className="rounded-2xl overflow-hidden border border-[#eff2f6] hover:shadow-2xl transition"
                key={item.pOrder}
              >
                <Link
                  to={`${location.pathname}/detail?partyName=${item.jdName}`}
                >
                  <div
                    id="image-container"
                    className="flex justify-center items-center w-full h-24 md:h-32 bg-[#f8f9fb]"
                  >
                    <ImgLoad
                      url={item.image}
                      otherStyle="max-h-12 md:max-h-16 max-w-40"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h5 className="font-semibold md:text-lg pb-1 text-gray-700">
                      {item.jdName}
                    </h5>
                    <ButtonLink
                      otherStyle="justify-end text-sm md:text-base"
                      label="정당정책보기"
                      size="md"
                    />
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

export default Policy;
