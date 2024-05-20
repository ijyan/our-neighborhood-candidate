import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import {
  ICommonPartyPlcInfoInqire,
  IPartyList,
  IPartyPlcInfoInqire,
} from '@/types';
import { PARTY_LIST } from '@/data';
import useAxios from '@/hooks/useAxios.ts';

function PolicyDetail({
  pageNo,
  numOfRows,
  sgId,
  partyName,
}: ICommonPartyPlcInfoInqire) {
  const { jdName } = useParams();
  const [policyData, setPolicyData] = useState<IPartyPlcInfoInqire[] | null>(
    [],
  );
  const [title, setTitle] = useState<string[]>([]);
  const [realName, setRealName] = useState<string[]>([]);
  const [content, setContent] = useState<string[]>([]);
  const [info, setInfo] = useState<IPartyList>({
    num: '0',
    jdName,
    color: '#333',
  });

  useEffect(() => {
    // body 백그라운드 컬러
    document.body.style.backgroundColor = '#f8f9fb';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  /**
   * 특정 조건을 포함하는 키만 필터링하고 그 값을 가져오는 함수
   * @param {IPartyPlcInfoInqire} data
   * @param {string} text - text를 포함하는 키 값
   * @returns {string[]}
   */
  function filterKeys(data: IPartyPlcInfoInqire, text: string): string[] {
    return Object.keys(data)
      .filter(key => key.includes(text))
      .map(titleKey => data[titleKey as keyof IPartyPlcInfoInqire]);
  }

  // 데이터 가져오기
  const { data, error, loading } = useAxios<IPartyPlcInfoInqire>({
    // 정당정책정보
    url: `/PartyPlcInfoInqireService/getPartyPlcInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}&partyName=${partyName}`,
    method: 'get',
  });

  useEffect(() => {
    // 데이터 가져오기
    if (data) {
      const res = data.response.body.items.item;
      const updatedImages = res.map((item: IPartyPlcInfoInqire) => {
        return {
          ...item,
          image: `../../../src/assets/party/${jdName}.png`,
        };
      });

      setPolicyData(updatedImages);
      setTitle(filterKeys(res[0], 'prmsTitle'));
      setRealName(filterKeys(res[0], 'prmsRealmName'));
      setContent(filterKeys(res[0], 'prmmCont'));
    }
  }, [data, numOfRows, pageNo, jdName]);

  useEffect(() => {
    const list = PARTY_LIST.filter(item =>
      item.jdName === jdName ? item.color : '',
    );
    setInfo(list[0]);
  }, [jdName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found.</p>;

  return (
    <section className="relative">
      <div className="max-w-3xl pt-32 md:pt-48 m-auto md:py-40">
        <div className="relative bg-white pt-16 px-6 pb-10 md:px-10 md:pt-24 md:rounded-3xl w-full gap-6">
          <div className="w-20 h-20 p-2 rounded-lg absolute -top-8 left-6 bg-white md:-top-16 md:left-10 md:w-32 md:h-32 border md:rounded-xl flex items-center justify-center md:p-3">
            <ImgLoad
              url={`../../../src/assets/party/${jdName}.png`}
              otherStyle="text-sm"
            />
          </div>
          <h3 className="text-2xl font-bold grow">{jdName}</h3>
          <h3 className="text-lg pt-10 font-semibold">정책목록</h3>
          {policyData ? (
            <ul>
              {title.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`flex w-full justify-between items-center ${open ? '' : 'border-b border-gray-800/[.06]'} py-4 md:py-6 text-left text-gray-700 focus:outline-none focus-visible:ring gap-4`}
                        >
                          <div className="relative pl-8 break-normal">
                            <span className="absolute t-0 left-0">
                              {index + 1}.
                            </span>
                            {`[${realName[index]}] ${item}`}
                          </div>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`${open ? '' : '-rotate-90'} flex-shrink-0`}
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.01 9.32259L7.33094 8L12.505 13.1783L17.6791 8L19 9.32143L12.505 15.82L6.01 9.32259Z"
                              fill="#374151"
                            />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-8 pb-8 text-gray-500 font-medium border-b border-gray-800/[.06] whitespace-pre-wrap break-normal">
                          {content[index]}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-12 text-center text-gray-300">
              내용이 없습니다.
            </div>
          )}
        </div>
      </div>
      {info ? (
        <div
          className="absolute w-full top-0 -z-10 h-32 md:h-64"
          style={{ backgroundColor: `${info.color}` }}
        />
      ) : (
        <div
          className="absolute w-full top-0 -z-10 h-32 md:h-64"
          style={{ backgroundColor: '#333' }}
        />
      )}
    </section>
  );
}

export default PolicyDetail;
