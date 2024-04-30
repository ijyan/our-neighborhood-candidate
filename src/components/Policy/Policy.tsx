import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IPartyCode } from '@/types';
import { getCommonPartyCodeList } from '@/services';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import ButtonLink from '@/components/ButtonLink/ButtonLink.tsx';

function Policy({ sgId }: { sgId: number }) {
  const [partyCodeData, setPartyCodeData] = useState<IPartyCode[]>([]);
  const location = useLocation();

  useEffect(() => {
    // 정당코드
    const fetchCommonPartyCodeList = async () => {
      try {
        const response = await getCommonPartyCodeList({ sgId });
        const data = response.data.response.body.items.item;

        const updatedImages = data.slice(0, -1).map((item: IPartyCode) => {
          return {
            ...item,
            image: `../../../src/assets/party/${item.jdName}.png`,
          };
        });
        setPartyCodeData(updatedImages);
        // console.log('data:', response.data.response.body.items.item);
      } catch (error) {
        console.error('Failed to fetchCommonPartyCodeList:', error);
      }
    };

    fetchCommonPartyCodeList();
  }, [sgId]);

  return (
    <>
      <div className="block text-gray-600 pb-6 text-right">
        전체 {partyCodeData.length}건
      </div>
      <ul className="grid grid-cols-3 gap-8 pb-32">
        {partyCodeData.map(item => (
          <li
            className="rounded-2xl shadow-md overflow-hidden"
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
                <h5 className="text-lg pb-1 text-gray-700">{item.jdName}</h5>
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
    </>
  );
}

export default Policy;
