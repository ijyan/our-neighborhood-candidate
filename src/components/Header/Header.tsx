import { Link } from 'react-router-dom';
import { Button } from '../Button';
import { IHeader } from './types';

function Header() {
  const link: IHeader[] = [
    {
      id: 0,
      title: '정당정책',
      list: [
        { id: 0, menu: '제22대 국회의원 선거', link: '#' },
        { id: 1, menu: '제20대 대통령 선거', link: '#' },
      ],
    },
    {
      id: 1,
      title: '당선인 공약',
      list: [
        { id: 0, menu: '제22대 국회의원 선거', link: '#' },
        { id: 1, menu: '제20대 대통령 선거', link: '#' },
      ],
    },
  ];

  return (
    <header className="w-full">
      <nav className="px-12 max-w-6xl m-auto">
        <div className="flex justify-center items-center h-16 gap-1">
          {link.map(el => (
            <div key={el.id} className="relative group">
              <Button>
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
              <ul className="flex-col justify-center p-1.5 rounded-md bg-white shadow-3xl gap-0.5 absolute w-[12rem] left-1/2 -translate-x-1/2 top-9 hidden group-hover:flex">
                {el.list.map(item => (
                  <li key={item.id}>
                    <Link
                      to="/"
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
    </header>
  );
}

export default Header;
