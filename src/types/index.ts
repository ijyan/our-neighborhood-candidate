/**
 * 기본 타입
 *
 * @param pageNo {number} - 페이지 번호
 * @param numOfRows {number} - 한 페이지 결과 수
 */
export interface IApiProp {
  pageNo?: number;
  numOfRows?: number;
}

/**
 * 정당코드 조회 타입
 * : 선거 ID, 정당명 순서 제공하는 정당코드 정보 제공
 *
 * @param pageNo {number} - 페이지 번호
 * @param numOfRows {number} - 한 페이지 결과 수
 * @param sgId {number} - 선거 ID(예: 20240410)
 */
export interface ICommonPartyCode extends IApiProp {
  sgId: number;
}

export interface IPartyCode extends ICommonPartyCode {
  num: number;
  jdName: string;
  pOrder: string;
  image?: string;
  color?: string;
}

/**
 * 정당정책정보 조회 타입
 */
export interface ICommonPartyPlcInfoInqire extends IApiProp {
  sgId: string;
  partyName: string | undefined;
}

export interface IPartyPlcInfoInqire {
  num: string;
  sgId: string;
  partyName: string;
  prmsCnt: string;
  prmsOrd1: string;
  prmsRealmName1: string;
  prmsTitle1: string;
  prmmCont1: string;
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
 * 당선인 조회 타입
 */
export interface ICommonWinnerProps extends IApiProp {
  sgId: number;
  sgTypecode: number;
  sdName?: string;
  sggName?: string;
}

export interface IWinnerInfo extends ICommonWinnerProps {
  num: string;
  // sgId: number;
  // sgTypecode: number;
  huboid: string;
  // sggName: string;
  // sdName: string;
  wiwName: string;
  giho: number;
  gihoSangse: string;
  jdName: string;
  name: string;
  hanjaName: string;
  gender: string;
  birthday: number;
  age: number;
  addr: string;
  jobId: number;
  job: string;
  eduId: number;
  edu: string;
  career1: string;
  career2: string;
  dugsu: number;
  dugyul: number;
  image?: string;
}
