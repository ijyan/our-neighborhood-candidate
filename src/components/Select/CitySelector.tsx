import { useEffect, useState } from 'react';
import { CITY_LIST } from '@/data';
import { ICityList } from '@/types';
import { useSearchParams } from 'react-router-dom';
import Button from '@/components/Button/Button.tsx';

function CitySelector({
  sdName,
  sggName,
}: {
  sdName: string;
  sggName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState<{
    city: string[];
    districts: string[];
    fullCity: string;
  }>({
    city: [],
    districts: [],
    fullCity: '',
  });

  useEffect(() => {
    // select 초기화
    CITY_LIST.forEach(item => {
      if (sdName && item.city.includes(sdName)) {
        setSelect(prev => ({
          ...prev,
          city: item.city,
          districts: item.districts,
          fullCity: sggName || '전체',
        }));
      }
    });
  }, [sdName, sggName]);

  const handleSelect = (obj: ICityList) => {
    setSelect(prev => ({
      ...prev,
      city: obj.city,
      districts: obj.districts,
      fullCity: obj.districts[0],
    }));
  };

  const [, setQuery] = useSearchParams();
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { city, fullCity } = select;
    setQuery({
      pageNo: '1',
      sdName: city[1],
      sggName: fullCity === '전체' ? '' : fullCity,
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const { body } = document;

    if (!isOpen) {
      body.style.overflow = 'auto';
      body.style.position = 'static';
      body.style.left = '0px';
      body.style.right = '0px';
    } else {
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.left = '0px';
      body.style.right = '0px';
    }

    // Cleanup function to remove the styles when the component unmounts or isOpen changes
    return () => {
      body.style.overflow = '';
      body.style.position = '';
      body.style.left = '';
      body.style.right = '';
    };
  }, [isOpen]);

  return (
    <div className="md:w-64">
      <button
        className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="지역 선택"
      >
        <span className="text-overflow">
          {select.city
            ? `${select.city[0]}${select.fullCity ? `, ${select.fullCity}` : ''}`
            : '시ㆍ도ㆍ선거구를 선택하세요.'}
        </span>
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
          <div className="fixed inset-0 w-full shadow-none md:absolute md:inset-auto md:mt-2 md:w-96 bg-white md:shadow-md md:rounded-lg text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
            <div className="md:hidden">
              <div className="text-right">
                <button
                  type="button"
                  className="m-5"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="a11y-hidden">닫기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M0 0h24v24H0z" />
                      <path
                        stroke="#000"
                        strokeWidth="2"
                        d="M20 4 4 20M4 4l16 16"
                      />
                    </g>
                  </svg>
                </button>
              </div>
              <h2 className="text-2xl px-6 pb-5 font-bold">지역</h2>
            </div>
            <div className="w-full flex border-t h-[calc(100%-116px-81px)] overflow-y-auto md:border-none md:max-h-60">
              <ul className="w-1/3 p-2 border-r overflow-y-auto shrink-0">
                {CITY_LIST.map(option => (
                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                  <li
                    key={option.id}
                    className={`text-gray-600 cursor-pointer pl-4 leading-10 rounded-md hover:bg-[#f8f9fb] mb-0.5 last:mb-0${option.city === select.city ? ' !bg-[#f3f4f8] text-green-500 font-bold' : ''}`}
                    onClick={() => handleSelect(option)}
                  >
                    {option.city[0]}
                  </li>
                ))}
              </ul>
              {/* {select.city?.districts ? ( */}
              {select.districts ? (
                <ul className="w-2/3 p-2 overflow-y-auto">
                  {select.districts?.map((item, idx) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
                    <li
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      className={`text-gray-600 cursor-pointer pl-4 leading-10 rounded-md hover:bg-[#f8f9fb] mb-0.5 last:mb-0${item === select.fullCity ? ' !bg-[#f3f4f8] text-green-500 font-bold' : ''}`}
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
            <div className="flex p-4 md:justify-end md:p-2 border-t">
              <button
                className="md:hidden w-full text-white bg-green-500 p-3 text-base transition flex justify-center items-centerrounded-md rounded-md hover:bg-green-600 active:bg-green-600"
                onClick={handleSubmit}
              >
                적용하기
              </button>
              <Button
                appearance="fill"
                otherStyle="text-green-500 hidden md:block"
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
  );
}

export default CitySelector;
