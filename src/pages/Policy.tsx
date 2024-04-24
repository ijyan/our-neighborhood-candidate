import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPartyCode } from '@/api';
import { ButtonLink } from '@/components';
import ImgLoad from '@/components/ImgLoad.tsx';
import { IPartyCode } from '@/types';

function Policy() {
  const [partyCodeData, setPartyCodeData] = useState<IPartyCode[]>([]);

  useEffect(() => {
    // 정당코드
    const fetchPartyCode = async () => {
      try {
        const response = await getPartyCode({ sgId: 20240410 });
        const data = response.data.response.body.items.item;

        const updatedImages = data.slice(0, -1).map((item: IPartyCode) => {
          return {
            ...item,
            image: `../src/assets/partyImage/party-${item.pOrder.padStart(2, '0')}.png`,
          };
        });
        setPartyCodeData(updatedImages);
        console.log('data:', response.data.response.body.items.item);
      } catch (error) {
        console.error('Failed to getPartyCode:', error);
      }
    };

    fetchPartyCode();
  }, []);

  console.log(partyCodeData);

  return (
    <section className="max-w-6xl m-auto px-12">
      <h2 className="text-center text-gray-800 text-5xl font-semibold py-32">
        제22대 국회의원 선거 정당 정책
      </h2>
      <div className="block text-gray-600 pb-6 text-right">
        전체 {partyCodeData.length}건
      </div>
      <ul className="grid grid-cols-3 gap-8 pb-32">
        {partyCodeData.map(item => (
          <li
            className="rounded-2xl shadow-md overflow-hidden"
            key={item.pOrder}
          >
            <Link to="#">
              <div
                id="image-container"
                className="flex justify-center items-center w-full h-32 bg-[#f8f9fb]"
              >
                <ImgLoad item={item} />
              </div>
              <div className="p-6">
                <h5 className="text-lg pb-1 text-gray-700">{item.jdName}</h5>
                <ButtonLink
                  otherStyle="justify-end"
                  label="정책보기"
                  size="md"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Policy;
