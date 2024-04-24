import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

// 요청 인터셉터
instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      console.log('요청이 중단되었습니다.');
    }
    return Promise.reject(error);
  },
);

/**
 * 기본 인터페이스
 *
 * @param pageNo {number} - 페이지 번호
 * @param numOfRows {number} - 한 페이지 결과 수
 */
interface IProp {
  pageNo?: number;
  numOfRows?: number;
}

/**
 * Axios API를 사용하여 선거 코드를 조회하는 함수
 * : 선거 ID, 선거종류코드, 선거명을 제공하는 선거코드 정보 제공
 *
 * @param pageNo {number} - 페이지 번호(최대값: 100000)
 * @param numOfRows {number} - 목록 건수(최대값: 100)
 */
const getElectionCode = async ({ pageNo = 1, numOfRows = 100 }: IProp = {}) => {
  try {
    const response = await instance.get(
      `/CommonCodeService/getCommonSgCodeList?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json`,
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch election codes:', error);
    throw error;
  }
};

/**
 * Axios API를 사용하여 정당코드를 조회하는 함수
 * : 선거 ID, 정당명 순서 제공하는 정당코드 정보 제공
 *
 * @param pageNo {number} - 페이지 번호
 * @param numOfRows {number} - 한 페이지 결과 수
 * @param sgId {number} - 선거 ID(예: 20240410)
 */

interface IPartyCode extends IProp {
  sgId: number;
}

const getPartyCode = async ({
  pageNo = 1,
  numOfRows = 100,
  sgId,
}: IPartyCode) => {
  try {
    const response = await instance.get(
      `/CommonCodeService/getCommonPartyCodeList?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}`,
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch party codes:', error);
    throw error;
  }
};

/**
 * Axios API를 사용하여 정당정책정보를 조회하는 함수
 * : 선거 ID와 정당명을 입력하여 정당정책 정보 제공
 *
 * @param pageNo {number} - 페이지 번호
 * @param numOfRows {number} - 한 페이지 결과 수
 * @param sgId {number} - 선거 ID(예: 20240410)
 * @param partyName {string} - 정당명(예: 00당)
 */
interface IPartyPolicyInformation extends IProp {
  sgId: number;
  partyName: string | undefined;
}

const getPartyPolicyInformation = async ({
  pageNo = 1,
  numOfRows = 100,
  sgId,
  partyName,
}: IPartyPolicyInformation) => {
  try {
    const response = await instance.get(
      `/PartyPlcInfoInqireService/getPartyPlcInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}&partyName=${partyName}`,
    );
    return response;
  } catch (error) {
    console.error('Failed to fetch party policy information:', error);
    throw error;
  }
};

export { getElectionCode, getPartyCode, getPartyPolicyInformation };
