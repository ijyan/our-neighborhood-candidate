import { Link } from 'react-router-dom';

function Home() {
  return (
    <main>
      <section className="flex justify-center items-center h-screen">
        <div className="w-6/12 m-auto flex gap-8 py-12 h-[36rem]">
          <Link
            to="/"
            className="px-16 py-20 w-full bg-gray-100 rounded-3xl flex flex-col gap-2 relative hover:bg-[#eaedf1] transition"
          >
            <h3 className="text-gray-800 text-3xl font-bold">
              정당정책 확인하기
            </h3>
            <p className="text-gray-500">정당의 정책을 확인하세요!</p>
            <span className="flex items-center text-sky-600 pt-4">
              바로가기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0284c7"
                  d="M9.783 17.566 8.65 16.434 13.086 12 8.65 7.566l1.132-1.132L15.349 12l-5.566 5.566Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <img
              className="absolute right-16 bottom-16"
              src="/images/landing-01.png"
              alt="정당정책 이미지"
            />
          </Link>
          <Link
            to="/"
            className="px-16 py-20 w-full bg-gray-100 rounded-3xl flex flex-col gap-2 relative hover:bg-[#eaedf1] transition"
          >
            <h3 className="text-gray-800 text-3xl font-bold">
              당선인 공약 확인하기
            </h3>
            <p className="text-gray-500">
              지난 선거 당선인의 공약을 확인하세요!
            </p>
            <span className="flex items-center text-sky-600 pt-4">
              바로가기
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0284c7"
                  d="M9.783 17.566 8.65 16.434 13.086 12 8.65 7.566l1.132-1.132L15.349 12l-5.566 5.566Z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <img
              className="absolute right-16 bottom-16"
              src="/images/landing-02.png"
              alt="당선인공약 이미지"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;
