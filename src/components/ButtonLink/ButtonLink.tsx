interface IProps {
  /** 링크 버튼의 텍스트 */
  label?: string;
  /** 버튼 크기 (기본값: sm) */
  size?: 'sm' | 'md' | 'lg';
  /** 이외의 다른 스타일(tailwind) */
  otherStyle?: string;
}

const buttonLinkSize = {
  sm: 'text-sm ',
  md: 'text-base',
  lg: 'text-lg',
};

const buttonLinkIconSize = {
  sm: 24,
  md: 26,
  lg: 28,
};

export default function ButtonLink({
  label,
  size = 'sm',
  otherStyle,
  ...props
}: IProps) {
  return (
    <span
      className={[
        'flex',
        'items-center',
        'text-sky-600',
        buttonLinkSize[size],
        otherStyle,
      ].join(' ')}
      {...props}
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={buttonLinkIconSize[size]}
        height={buttonLinkIconSize[size]}
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
  );
}
