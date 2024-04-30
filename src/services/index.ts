import axios from 'axios';
import {
  IApiProp,
  ICommonPartyCode,
  ICommonPartyPlcInfoInqire,
  ICommonWinnerProps,
} from '@/types';

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
 * Axios API를 사용하여 선거 코드를 조회하는 함수
 * : 선거 ID, 선거종류코드, 선거명을 제공하는 선거코드 정보 제공
 *
 * @param pageNo {number} - 페이지 번호(최대값: 100000)
 * @param numOfRows {number} - 목록 건수(최대값: 100)
 */
const getCommonSgCodeList = async ({
  pageNo = 1,
  numOfRows = 100,
}: IApiProp = {}) => {
  try {
    const response = await instance.get(
      `/CommonCodeService/getCommonSgCodeList?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json`,
    );
    return response;
  } catch (error) {
    console.error('Failed to getCommonSgCodeList:', error);
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
const getCommonPartyCodeList = async ({
  pageNo = 1,
  numOfRows = 100,
  sgId,
}: ICommonPartyCode) => {
  try {
    const response = await instance.get(
      `/CommonCodeService/getCommonPartyCodeList?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}`,
    );
    return response;
  } catch (error) {
    console.error('Failed to getCommonPartyCodeList:', error);
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
const getPartyPlcInfoInqire = async ({
  pageNo = 1,
  numOfRows = 100,
  sgId,
  partyName,
}: ICommonPartyPlcInfoInqire) => {
  try {
    const response = await instance.get(
      `/PartyPlcInfoInqireService/getPartyPlcInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}&partyName=${partyName}`,
    );
    return response;
  } catch (error) {
    console.error('Failed to getPartyPlcInfoInqire:', error);
    throw error;
  }
};

/**
 * Axios API를 사용하여 당선인 정보를 조회하는 함수
 * : 선거ID, 선거종류, 선거구명, 시도명을 입력받아 당선인 관련 기초정보 및 정당명,직업,학력,경력등을 조회할 수 있는 당선인정보조회서비스
 *
 * @param pageNo {number} - 페이지 번호
 * @param numOfRows {number} - 한 페이지 결과 수
 * @param sgId {number} - 선거 ID(예: 20240410)
 * @param sgTypecode {number} - 선거종류코드(예: 2)
 * @param sdName {string} - 시도명
 * @param sggName {string} - 선거구명
 */
const getWinnerInfoInqire = async ({
  pageNo = 1,
  numOfRows = 100,
  sgId,
  sgTypecode,
  sdName,
  sggName,
}: ICommonWinnerProps) => {
  try {
    const response = await instance.get(
      `/WinnerInfoInqireService2/getWinnerInfoInqire?serviceKey=${import.meta.env.VITE_API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&resultType=json&sgId=${sgId}&sgTypecode=${sgTypecode}&sggName=${sggName}&sdName=${sdName}`,
    );
    return response;
  } catch (error) {
    console.error('Failed to getWinnerInfoInqire:', error);
    throw error;
  }
};

export {
  getCommonSgCodeList,
  getCommonPartyCodeList,
  getPartyPlcInfoInqire,
  getWinnerInfoInqire,
};
