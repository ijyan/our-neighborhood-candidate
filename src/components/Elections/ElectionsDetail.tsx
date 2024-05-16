import { ICommonWinnerProps, IWinnerInfo } from '@/types';
import { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios.ts';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';

function ElectionsDetail({
  pageNo,
  numOfRows,
  sgId,
  sgTypecode,
  sggName,
  sdName,
}: ICommonWinnerProps) {
  const [info, setInfo] = useState<Omit<
    IWinnerInfo,
    'pageNo' | 'numOfRows'
  > | null>(null);

  /**
   * 생년월일 형식 변환 함수
   * @param {number} birthDateNumber
   * @returns {string}
   */
  const formatBirthdate = (birthDateNumber: number): string => {
    const birthDateStr = birthDateNumber.toString();
    const year = birthDateStr.substring(0, 4);
    const month = birthDateStr.substring(4, 6);
    const day = birthDateStr.substring(6, 8);
    return `${year}년 ${month}월 ${day}일`;
  };

  /**
   * 만나이 계산 함수
   * @param {number} birth
   * @returns {number}
   */
  const calculateAge = (birth: number): number => {
    const birthDateStr = birth.toString();
    const year = parseInt(birthDateStr.substring(0, 4), 10);
    const month = parseInt(birthDateStr.substring(4, 6), 10) - 1;
    const day = parseInt(birthDateStr.substring(6, 8), 10);

    const birthDate = new Date(year, month, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    // 생일이 지나지 않았을 경우
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age -= 1;
    }
    return age;
  };

  // 데이터 가져오기
  const { data, error, loading } = useAxios<IWinnerInfo>({
    url: `/WinnerInfoInqireService2/getWinnerInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}&sgTypecode=${sgTypecode}&sggName=${sggName}&sdName=${sdName}`,
    method: 'get',
  });

  useEffect(() => {
    // 데이터 가져오기
    if (data) {
      const res = data.response.body.items.item;
      const updatedImages = res.map((item: IWinnerInfo) => {
        return {
          ...item,
          image: `../../../src/assets/person/${item.huboid}.jpg`,
        };
      });
      setInfo(updatedImages[0]);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <>
      {info && (
        <div className="max-w-3xl m-auto">
          <div className="flex px-6 py-24 items-center gap-16">
            <div className="aspect-3/4 object-cover flex justify-center items-center overflow-hidden w-full rounded-2xl max-w-80 bg-[#f8f9fb]">
              <ImgLoad url={info.image} alt={info.name} />
            </div>
            <div className="w-full">
              <div className="text-3xl font-semibold">
                {info.name} | {info.hanjaName}
              </div>
              <ul className="py-8 flex gap-3 flex-col">
                <li className="flex">
                  <span className="block w-20 text-gray-500 shrink-0">
                    선거구
                  </span>
                  <div>{info.sdName}</div>
                </li>
                <li className="flex">
                  <span className="block w-20 text-gray-500 shrink-0">
                    출생
                  </span>
                  <div>
                    {formatBirthdate(info.birthday)} (
                    {calculateAge(info.birthday)}세)
                  </div>
                </li>
                <li className="flex">
                  <span className="block w-20 text-gray-500 shrink-0">
                    학력
                  </span>
                  <div>{info.edu}</div>
                </li>
                <li className="flex">
                  <span className="block w-20 text-gray-500 shrink-0">
                    직업
                  </span>
                  <div>{info.job}</div>
                </li>
                <li className="flex">
                  <span className="block w-20 text-gray-500 shrink-0">
                    경력
                  </span>
                  <div>
                    <div className="mb-1">{info.career1}</div>
                    <div>{info.career2}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ElectionsDetail;
