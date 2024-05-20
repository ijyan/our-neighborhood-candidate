import { Link } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink/ButtonLink.tsx';

function Home() {
  const data = [
    {
      id: 1,
      title: '정당정책 확인하기',
      description: '정당의 정책을 확인하세요!',
      link: '/policy/parliamentary/22?pageNo=1',
      img: '/images/landing-01.png',
      imgAlt: '정당정책 이미지',
    },
    {
      id: 2,
      title: '당선인 공약 확인하기',
      description: '지난 선거 당선인의 공약을 확인하세요!',
      link: '/elections/parliamentary/22?pageNo=1&sdName=서울특별시&sggName=',
      img: '/images/landing-02.png',
      imgAlt: '당선인 공약 이미지',
    },
  ];

  return (
    <main>
      <section className="flex justify-center items-center h-dvh">
        <div className="flex flex-col w-full m-auto gap-8 p-8 md:flex-row md:max-w-[60rem] md:gap-8 md:h-[32rem]">
          {data.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className="p-8 w-full bg-[#f8f9fb] rounded-3xl flex justify-between items-center relative hover:bg-[#f3f4f8] transition md:px-16 md:py-20 md:items-start md:p-12"
            >
              <div>
                <h3 className="text-gray-800 font-bold text-xl md:text-3xl">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 pt-2 sm:text-base">
                  {item.description}
                </p>
                <ButtonLink otherStyle="pt-4" label="바로가기" size="sm" />
              </div>
              <div className="hidden md:absolute md:right-12 md:bottom-12 sm:block sm:w-1/4 md:w-[8rem] lg:w-[10rem]">
                <img
                  className="w-full h-auto"
                  src={item.img}
                  alt="정당정책 이미지"
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
