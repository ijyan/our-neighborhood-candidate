interface IProps {
  /** 버튼 HTML의 타입값 (기본값: button) */
  type?: 'button' | 'submit' | 'reset';
  /** 버튼 형태 (기본값: fill) */
  appearance?: 'fill' | 'outline';
  /** 버튼 색상값 (기본값: base) */
  color?: 'base' | 'primary';
  /** 버튼 크기 (기본값: sm) */
  size?: 'sm' | 'md' | 'lg';
  /** 버튼 크기의 width: 100% 여부 */
  isFullWidth?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  otherStyle?: string;
  /** 버튼 Disabled 여부 */
  isDisabled?: boolean;
}

export default function Button({
  type = 'button',
  appearance = 'fill',
  color = 'base',
  size = 'sm',
  isFullWidth = false,
  children,
  onClick,
  otherStyle,
  isDisabled,
  ...props
}: IProps) {
  const buttonAppearance = {
    fill: 'flex justify-center items-center whitespace-nowrap',
    outline:
      'flex justify-center items-center rounded-md whitespace-nowrap border',
  };

  const buttonSize = {
    sm: 'px-3 h-9 rounded-md text-sm ',
    md: 'px-4 h-10 rounded-lg text-sm',
    lg: 'px-5 h-14 rounded-lg text-base',
  };

  const buttonColor = {
    base: `text-gray-800 ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-800/[.04] active:bg-gray-800/[.08]'}`,
    primary: `bg-gray-700 text-white ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-800 active:text-gray-200 border-gray-800'}`,
  };

  return (
    <button
      className={[
        'transition',
        buttonAppearance[appearance],
        buttonColor[color],
        buttonSize[size],
        isFullWidth ? 'w-full' : '',
        isDisabled ? 'disabled:opacity-40 cursor-not-allowed' : '',
        otherStyle,
      ].join(' ')}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
}
