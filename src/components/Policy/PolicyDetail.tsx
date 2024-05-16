import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import Button from '@/components/Button/Button.tsx';
import ImgLoad from '@/components/ImgLoad/ImgLoad.tsx';
import { getPartyPlcInfoInqire } from '@/services';
import {
  ICommonPartyPlcInfoInqire,
  IPartyList,
  IPartyPlcInfoInqire,
} from '@/types';
import { PARTY_LIST } from '@/data';

function PolicyDetail({
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

  useEffect(() => {
    // 정당정책정보 조회
    const fetchPartyPolicyInformation = async () => {
      try {
        const response = await getPartyPlcInfoInqire({
          numOfRows,
          sgId,
          partyName,
        });
        const tmp = response.data.response.body;
        if (!tmp) {
          setPolicyData(null);
          return;
        }
        const data = response.data.response.body.items.item[0];
        setPolicyData(data);
        setTitle(filterKeys(data, 'prmsTitle'));
        setRealName(filterKeys(data, 'prmsRealmName'));
        setContent(filterKeys(data, 'prmmCont'));
      } catch (error) {
        console.error('Failed to fetchPartyPolicyInformation: ', error);
      }
    };
    fetchPartyPolicyInformation();
  }, [sgId, partyName, numOfRows]);

  useEffect(() => {
    const data = PARTY_LIST.filter(item =>
      item.jdName === jdName ? item.color : '',
    );
    setInfo(data[0]);
  }, [jdName]);

  return (
    <section className="relative">
      <div className="max-w-3xl m-auto px-6 py-24 flex flex-col gap-6">
        <div className="bg-white p-10 rounded-3xl flex justify-center items-center w-full gap-6">
          <div className="w-32 h-32 border rounded-xl flex items-center justify-center p-3">
            <ImgLoad
              url={`../../../src/assets/party/${jdName}.png`}
              otherStyle="text-sm"
            />
          </div>
          <div className="flex justify-between items-center grow gap-3">
            <h3 className="text-2xl font-semibold grow">{jdName}</h3>
            <div className="flex gap-2">
              <Button appearance="outline" isDisabled={!policyData}>
                이미지 보기
              </Button>
              <Button appearance="outline" isDisabled={!policyData}>
                PDF 다운로드
              </Button>
            </div>
          </div>
        </div>
        <div className="p-10 bg-white rounded-3xl">
          <h3 className="text-xl pb-8 font-semibold">정당목록</h3>
          {policyData ? (
            <ul>
              {title.map((item, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={index}>
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`flex w-full justify-between items-center ${open ? '' : 'border-b border-gray-800/[.06]'} py-6 text-left text-gray-700 focus:outline-none focus-visible:ring gap-4`}
                        >
                          <div className="relative pl-8">
                            <span className="absolute t-0 left-0">
                              {index + 1}.{' '}
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
                        <Disclosure.Panel className="px-8 pb-8 text-gray-500 font-medium border-b border-gray-800/[.06] whitespace-pre-wrap">
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
      <div
        className="absolute w-full top-0 -z-10 h-[200px]"
        style={{ backgroundColor: `${info.color || '#333'}` }}
      />
    </section>
  );
}

export default PolicyDetail;
