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

  return (
    <div className="w-64">
      <button
        className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="지역 선택"
      >
        {select.city
          ? `${select.city[0]}${select.fullCity ? `, ${select.fullCity}` : ''}`
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
                    className={`text-gray-600 cursor-pointer pl-4 leading-9 rounded-md hover:bg-[#f8f9fb] mb-0.5 last:mb-0${option.city === select.city ? ' !bg-[#f3f4f8] text-green-500' : ''}`}
                    onClick={() => handleSelect(option)}
                  >
                    {option.city[0]}
                  </li>
                ))}
              </ul>
              {/* {select.city?.districts ? ( */}
              {select.districts ? (
                <ul className="w-2/3 p-2 max-h-60 overflow-y-auto">
                  {select.districts?.map((item, idx) => (
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
  );
}

export default CitySelector;
