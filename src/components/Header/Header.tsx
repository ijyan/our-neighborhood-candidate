import { Link } from 'react-router-dom';
import { IHeader } from '@/components/Header/Header.types.ts';
import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import Button from '../Button/Button.tsx';

function Header() {
  const link: IHeader[] = [
    {
      id: 0,
      title: '정당정책',
      list: [
        {
          id: 0,
          menu: '제22대 국회의원 선거',
          link: '/policy/parliamentary/22?pageNo=1',
        },
        {
          id: 1,
          menu: '제20대 대통령선거',
          link: '/policy/presidential/20?pageNo=1',
        },
      ],
    },
    {
      id: 1,
      title: '당선인 공약',
      list: [
        {
          id: 0,
          menu: '제22대 국회의원 선거',
          link: '/elections/parliamentary/22?pageNo=1&sdName=서울특별시&sggName=',
        },
        {
          id: 1,
          menu: '제20대 대통령선거',
          link: '/elections/presidential/20?pageNo=1',
        },
      ],
    },
  ];

  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const resizeListener = debounce(() => {
      // 리사이징 이벤트가 발생할 때마다 컴포넌트가 재렌더링되는 것을 최소화하기 위해 debounce 사용
      setInnerWidth(window.innerWidth);
    }, 300); // 300ms 디바운스 타임아웃

    window.addEventListener('resize', resizeListener);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', resizeListener);
      resizeListener.cancel(); // Lodash debounce cancel
    };
  }, []);

  return (
    <header className="w-full bg-white z-50 fixed border-b border-gray-800/[.06] top-0">
      {innerWidth < 1024 ? (
        <>
          <div className="px-6 h-14 flex items-center justify-between">
            <h1 className="">
              <Link to="/" className="text-xl wavve-pado text-green-500 block">
                우리동네일꾼
              </Link>
            </h1>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <>
                  <span className="a11y-hidden">메뉴 닫기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" fillRule="evenodd">
                      <path d="M0 0h24v24H0z" />
                      <path
                        stroke="#000"
                        strokeWidth="2"
                        d="M20 4 4 20M4 4l16 16"
                      />
                    </g>
                  </svg>
                </>
              ) : (
                <>
                  <span className="a11y-hidden">메뉴 열기</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      fillRule="evenodd"
                      d="M4 6a1 1 0 0 0 0 2h16a1 1 0 1 0 0-2H4Zm-1 6.5a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1ZM3 18a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
          {isOpen && (
            <nav className="fixed bg-gray-950/[.3] top-14 left-0 w-full h-full z-30">
              <ul className="bg-white px-6 py-4 border-t border-gray-800/[.06]">
                {link.map(el => (
                  <li key={el.id} className="mt-6 first:mt-0">
                    <span className="text-gray-400 text-sm">{el.title}</span>
                    {el.list.map(item => (
                      <Link
                        to={item.link}
                        className="block my-4 font-semibold"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.menu}
                      </Link>
                    ))}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      ) : (
        <div className="px-12 max-w-6xl mx-auto relative">
          <h1 className="absolute left-12 top-1/2 transform -translate-y-1/2">
            <Link to="/" className="text-2xl wavve-pado text-green-500 block">
              우리동네일꾼
            </Link>
          </h1>
          <nav>
            <div className="flex justify-center items-center h-16 gap-1">
              {link.map(el => (
                <div key={el.id} className="relative group">
                  <Button otherStyle="font-bold">
                    {el.title}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#1F2937"
                        d="M11.48 14.095a.7.7 0 0 0 1.04 0l2.929-3.254a.7.7 0 0 0-.52-1.168H9.071a.7.7 0 0 0-.52 1.168l2.928 3.254Z"
                      />
                    </svg>
                  </Button>
                  <ul className="flex-col justify-center p-1.5 rounded-md bg-white shadow-3xl gap-0.5 absolute w-40 left-1/2 -translate-x-1/2 top-9 hidden group-hover:flex z-10">
                    {el.list.map(item => (
                      <li key={item.id}>
                        <Link
                          to={item.link}
                          className="flex items-center justify-center px-3 h-10 text-sm text-gray-700 hover:bg-gray-800/[.04] transition rounded-md w-full"
                        >
                          {item.menu}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
