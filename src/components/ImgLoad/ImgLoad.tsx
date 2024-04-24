import { useState } from 'react';

interface IProp {
  url?: string | undefined;
  otherStyle?: string;
}

function ImgLoad({ url, otherStyle }: IProp) {
  const [loadError, setLoadError] = useState(false);

  return (
    <>
      {loadError ? (
        <span className={`nanum-neo text-gray-300 text-center ${otherStyle}`}>
          이미지가 없습니다.
        </span>
      ) : (
        <img
          className={otherStyle}
          src={url}
          alt=""
          onError={() => setLoadError(true)}
        />
      )}
    </>
  );
}

export default ImgLoad;
