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
  onClick?: () => void;
  children?: React.ReactNode;
}

const buttonAppearance = {
  fill: 'flex justify-center items-center rounded-md whitespace-nowrap',
  outline:
    'flex justify-center items-center rounded-md whitespace-nowrap border',
};

const buttonSize = {
  sm: 'px-3 text-sm h-9',
  md: 'w-18 h-8',
  lg: 'w-24 h-10',
};

const buttonColor = {
  base: 'text-gray-800 hover:bg-gray-800/[.04] active:bg-gray-800/[.08]',
  primary:
    'bg-gray-700 text-white hover:bg-gray-800 active:text-gray-200 border-gray-800',
  secondary: 'bg-red-400 text-white',
};

export default function Button({
  type = 'button',
  appearance = 'fill',
  color = 'base',
  size = 'sm',
  isFullWidth = false,
  children,
  onClick,
  ...props
}: IProps) {
  return (
    <button
      className={[
        'transition',
        buttonAppearance[appearance],
        buttonColor[color],
        buttonSize[size],
        isFullWidth ? 'w-full' : '',
      ].join(' ')}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
