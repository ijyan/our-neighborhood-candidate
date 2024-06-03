import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // 모든 요청에 대한 기본 URL 설정
  withCredentials: true, // 쿠키를 포함시키기 위한 설정
  headers: {
    'Content-Type': 'application/json', // 기본 컨텐츠 타입
    'Access-Control-Allow-Origin': '*', // CORS 허용 설정
    'Access-Control-Allow-Credentials': 'true', // 크리덴셜 허용 설정
  },
  timeout: 120000, // 요청 타임아웃 시간 설정
});

// 응답 인터셉터
instance.interceptors.response.use(
  response => {
    // if (response.status === 304) {
    //   return Promise.resolve({
    //     ...response,
    //     data: null,
    //   });
    // }
    return response;
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      console.log('요청이 중단되었습니다.');
    }
    return Promise.reject(error);
  },
);

export default instance;
