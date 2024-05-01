import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICityList, ICommonWinnerProps, IWinnerInfo } from '@/types';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';
import Button from '@/components/Button/Button.tsx';
import { CITY_LIST } from '@/data';
import useAxios from '@/hooks/useAxios.ts';

function Elections({ sgId, sgTypecode, sggName, sdName }: ICommonWinnerProps) {
  const [origin, setOrigin] = useState<{
    data: IWinnerInfo[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });
  const [state, setState] = useState<{
    data: IWinnerInfo[];
    totalCount: number;
  }>({
    data: [],
    totalCount: 0,
  });
  const location = useLocation();

  // 시ㆍ도ㆍ선거구를 선택
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<{
    city: ICityList | null;
    fullCity: string | null;
  }>({
    city: null,
    fullCity: null,
  });

  const { data, error, loading } = useAxios<IWinnerInfo>({
    url: `/WinnerInfoInqireService2/getWinnerInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=1&numOfRows=24&resultType=json&sgId=${sgId}&sgTypecode=${sgTypecode}&sggName=${sggName}&sdName=${sdName}`,
    method: 'get',
  });
  console.log('render');

  useEffect(() => {
    if (data) {
      const res = data.response.body.items.item;
      const total = data.response.body.totalCount;
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
      }));
      setOrigin({
        data: updatedImages,
        totalCount: total,
      });
    }
  }, [data]);

  const handleSelect = (obj: ICityList) => {
    setSelect(prev => ({
      ...prev,
      city: obj,
      fullCity: null,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { fullCity, city } = select;
    if (!fullCity && city?.city !== '전체') {
      alert('지역을 선택해주세요.');
      return;
    }
    if (city?.city === '전체') {
      setState(prev => ({
        ...prev,
        data: origin.data,
        totalCount: origin.totalCount,
      }));
      setIsOpen(false);
      return;
    }
    if (select.fullCity?.includes('전체')) {
      const res = state.data.filter(
        item => select.city?.city && item.sdName?.includes(select.city.city),
      );
      setState(prev => ({
        ...prev,
        data: res,
        totalCount: res.length,
      }));
      setIsOpen(false);
      return;
    }
    if (city?.city && !fullCity?.includes('전체')) {
      const res = state.data
        .filter(item => city?.city && item.sdName?.includes(city.city))
        .filter(el => el.sggName && el.sggName.includes(fullCity ?? ''));
      setState(prev => ({
        ...prev,
        data: res,
        totalCount: res.length,
      }));
      setIsOpen(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <>
      <div className="flex justify-between items-center pb-6">
        <div className="w-60">
          <button
            className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="지역 선택"
          >
            {select.city
              ? `${select.city?.city}${select.fullCity ? `, ${select.fullCity}` : ''}`
              : '시ㆍ도ㆍ선거구를 선택하세요.'}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-5 w-5 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>
          {isOpen && (
            <>
              <div className="absolute mt-2 w-96 bg-white shadow-md rounded-lg text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30">
                <div className="w-full flex">
                  <ul className="w-1/3 p-2 border-r max-h-60 overflow-y-auto shrink-0">
                    {CITY_LIST.map(option => (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                      <li
                        key={option.id}
                        className={`text-gray-600 cursor-pointer pl-4 leading-9 rounded-md hover:bg-[#f8f9fb] mb-0.5 last:mb-0${option.city === select.city?.city ? ' !bg-[#f3f4f8] text-green-500' : ''}`}
                        onClick={() => handleSelect(option)}
                      >
                        {option.city}
                      </li>
                    ))}
                  </ul>
                  {select.city?.districts ? (
                    <ul className="w-2/3 p-2 max-h-60 overflow-y-auto">
                      {select.city?.districts?.map((item, idx) => (
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                        <li
                          // eslint-disable-next-line react/no-array-index-key
                          key={idx}
                          className={`text-gray-600 cursor-pointer pl-4 leading-9 rounded-md hover:bg-[#f8f9fb] mb-0.5 last:mb-0${item === select.fullCity ? ' !bg-[#f3f4f8] text-green-500' : ''}`}
                          onClick={() =>
                            setSelect(prev => ({
                              ...prev,
                              fullCity: item,
                            }))
                          }
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="w-2/3 p-2 text-sm flex justify-center items-center text-gray-400">
                      지역을 선택해주세요.
                    </div>
                  )}
                </div>
                <div className="flex justify-end p-2 border-t">
                  <Button
                    appearance="fill"
                    otherStyle="text-green-500"
                    onClick={handleSubmit}
                  >
                    적용하기
                  </Button>
                </div>
              </div>
              <div
                role="presentation"
                className="fixed inset-0 z-20"
                onClick={() => setIsOpen(false)}
              />
            </>
          )}
        </div>
        <div className="text-gray-600 text-right">
          전체 {state.totalCount}건
        </div>
      </div>
      {state.data.length ? (
        <ul className="grid grid-cols-3 gap-8 pb-32">
          {state.data.map(item => (
            <li
              key={item.huboid}
              className="rounded-2xl overflow-hidden bg-white hover:bg-[#f3f4f8] transition"
            >
              <Link to={`${location.pathname}/${item.huboid}`}>
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
