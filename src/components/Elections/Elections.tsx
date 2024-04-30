import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICommonWinnerProps, IWinnerInfo } from '@/types';
import { getWinnerInfoInqire } from '@/services';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';

function Elections({ sgId, sgTypecode, sggName, sdName }: ICommonWinnerProps) {
  const [electedData, setElectedData] = useState<IWinnerInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // 정당코드
    const fetchWinnerInfoInqire = async () => {
      try {
        const response = await getWinnerInfoInqire({
          sgId,
          sgTypecode,
          sggName,
          sdName,
        });
        const data = response.data.response.body.items.item;
        const total = response.data.response.body.totalCount;
        setTotalCount(total);

        const updatedImages = data.map((item: IWinnerInfo) => {
          return {
            ...item,
            image: `../../../src/assets/person/${item.huboid}.jpg`,
          };
        });
        setElectedData(updatedImages);
        // console.log('data:', response.data.response.body.items.item);
      } catch (error) {
        console.error('Failed to fetchWinnerInfoInqire:', error);
      }
    };

    fetchWinnerInfoInqire();
  }, [sgId, sggName, sdName, sgTypecode]);

  console.log(electedData);

  return (
    <>
      <div className="block text-gray-600 pb-6 text-right">
        전체 {totalCount}건
      </div>
      <ul className="grid grid-cols-3 gap-8 pb-32">
        {electedData.map(item => (
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
                    <h3 className="text-3xl text-gray-700 pb-3">{item.name}</h3>
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
    </>
  );
}

export default Elections;
