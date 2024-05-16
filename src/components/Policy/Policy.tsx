import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ICommonPartyCode, IPartyCode } from '@/types';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';
import Pagination from '@/components/Pagination/Pagination.tsx';
import useAxios from '@/hooks/useAxios.ts';

function Policy({ pageNo, sgId, numOfRows }: ICommonPartyCode) {
  // const [partyCodeData, setPartyCodeData] = useState<IPartyCode[]>([]);
  const [partyData, setPartyData] = useState<IPartyCode[]>([]);
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
      const updatedImages = res.map((item: IPartyCode) => {
        return {
          ...item,
          image: `../../../src/assets/party/${item.jdName}.png`,
        };
      });

      setPartyData(updatedImages);
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
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <>
      <div className="block text-gray-600 pb-6 text-right">
        전체 {data.response.body.totalCount}건
      </div>
      {partyData.length ? (
        <>
          <ul className="grid grid-cols-3 gap-8 pb-32">
            {partyData.map(item => (
              <li
                className="rounded-2xl overflow-hidden border border-[#eff2f6] hover:shadow-2xl transition"
                key={item.pOrder}
              >
                <Link to={`${location.pathname}/${item.jdName}`}>
                  <div
                    id="image-container"
                    className="flex justify-center items-center w-full h-32 bg-[#f8f9fb]"
                  >
                    <ImgLoad url={item.image} otherStyle="max-h-16 max-w-40" />
                  </div>
                  <div className="p-6">
                    <h5 className="text-lg pb-1 text-gray-700">
                      {item.jdName}
                    </h5>
                    <ButtonLink
                      otherStyle="justify-end"
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
            endPageNo={Math.ceil(
              data.response.body.totalCount / data.response.body.numOfRows,
            )}
          />{' '}
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

export default Policy;
