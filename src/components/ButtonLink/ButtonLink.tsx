import { Link } from 'react-router-dom';

interface IProps {
  /** 링크 버튼의 텍스트 */
  label?: string;
  /** 링크 버튼의 URL */
  url?: string;
  /** 버튼 크기 (기본값: sm) */
  size?: 'sm' | 'md' | 'lg';
}

const buttonLinkSize = {
  sm: 'text-sm ',
  md: 'text-base',
  lg: 'text-lg',
};

export default function ButtonLink({
  label = '바로가기',
  url = '#',
  size = 'sm',
}: IProps) {
  return (
    <Link
      to={url}
      className={[
        'flex',
        'justify-center',
        'items-center',
        buttonLinkSize[size],
      ].join(' ')}
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
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
    </Link>
  );
}
