/**
 * 정당코드를 조회하는 타입
 */
export interface ICommonPartyCode {
  pageNo: number; // 페이지 번호
  numOfRows: number; // 한 페이지 결과 수
  sgId: number; // 선거 ID(예: 20240410)
  pageTitle?: string; // 페이지 타이틀
}

export interface IPartyCode extends ICommonPartyCode {
  num: number; // 결과 순서
  jdName: string; // 정당명
  pOrder: string; // 순서
  image?: string; // 정당 이미지
  color?: string; // 정당 색깔
}

/**
 * 정당정책정보를 조회하는 타입
 */
export interface ICommonPartyPlcInfoInqire {
  pageNo?: number; // 페이지 번호
  numOfRows?: number; // 한 페이지 결과 수
  sgId: number; // 선거 ID(예: 20240410)
  partyName: string | undefined; // 정당명(예: 00당)
  pageTitle?: string; // 페이지 타이틀
}

export interface IPartyPlcInfoInqire {
  num: string; // 결과 순서
  sgId: string; // 선거 ID(예: 20240410)
  partyName: string; // 정당명
  prmsCnt: string; // 공약개수
  prmsOrd1: string; // 공약순번1
  prmsRealmName1: string; // 공약분야명1
  prmsTitle1: string; // 공약제목명1
  prmmCont1: string; // 공약내용
  prmsOrd2: string;
  prmsRealmName2: string;
  prmsTitle2: string;
  prmmCont2: string;
  prmsOrd3: string;
  prmsRealmName3: string;
  prmsTitle3: string;
  prmmCont3: string;
  prmsOrd4: string;
  prmsRealmName4: string;
  prmsTitle4: string;
  prmmCont4: string;
  prmsOrd5: string;
  prmsRealmName5: string;
  prmsTitle5: string;
  prmmCont5: string;
  prmsOrd6: string;
  prmsRealmName6: string;
  prmsTitle6: string;
  prmmCont6: string;
  prmsOrd7: string;
  prmsRealmName7: string;
  prmsTitle7: string;
  prmmCont7: string;
  prmsOrd8: string;
  prmsRealmName8: string;
  prmsTitle8: string;
  prmmCont8: string;
  prmsOrd9: string;
  prmsRealmName9: string;
  prmsTitle9: string;
  prmmCont9: string;
  prmsOrd10: string;
  prmsRealmName10: string;
  prmsTitle10: string;
  prmmCont10: string;
}

export interface IPartyList {
  num: string;
  jdName: string | undefined;
  color: string;
}

/**
 * 당선인 정보를 조회하는 타입
 */
export interface ICommonWinnerProps {
  pageNo: number; // 페이지 번호
  numOfRows: number; // 한 페이지 결과 수
  sgId: number; // 선거 ID (예: 20240410)
  sgTypecode: number; // 선거종류코드(예: 2)
  sdName?: string; // 시도명
  sggName?: string; // 선거구명
  pageTitle?: string; // 페이지 타이틀
}

/**
 * 당선인 정보를 조회하는 타입
 */
export interface IWinnerInfo extends ICommonWinnerProps {
  num: string; // 결과순서
  // sgId: number;
  // sgTypecode: number;
  huboid: string; // 후보자 ID
  // sggName: string;
  // sdName: string;
  wiwName: string; // 구시군명
  giho: number; // 기호
  gihoSangse: string; // 기호상세
  jdName: string; // 정당명
  name: string; // 한글성명
  hanjaName: string; // 한자성명
  gender: string; // 성별
  birthday: number; // 생년월일
  age: number; // 연령
  addr: string; // 주소
  jobId: number; // 직업ID
  job: string; // 직업
  eduId: number; // 학력ID
  edu: string; // 학력
  career1: string; // 경력1
  career2: string; // 경력2
  dugsu: number; // 득표수
  dugyul: number; // 득표율
  image?: string; // 프로필이미지
}

/**
 * CITY_LIST 타입
 */
export interface ICityList {
  id: string; // 지역번호
  city: string[]; // 광역시도
  districts: string[]; // 시군구
}

/**
 * ApiResponse 타입
 */
export interface ApiResponse<T> {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: T[];
      };
      numOfRows: number; // 목록건수
      pageNo: number; // 페이지번호
      totalCount: number; // 총건수
    };
  };
}
