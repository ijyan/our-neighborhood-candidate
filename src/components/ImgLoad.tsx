import { useState } from 'react';
import { IPartyCode } from '@/types';

interface IProp {
  item: IPartyCode;
}

function ImgLoad({ item }: IProp) {
  const [loadError, setLoadError] = useState(false);

  return (
    <>
      {loadError ? (
        // <span className="nanum-neo text-xl">{item.jdName}</span>
        <span className="nanum-neo text-gray-300">이미지가 없습니다.</span>
      ) : (
        <img
          className="max-h-16 max-w-40"
          src={item.image}
          alt=""
          onError={() => setLoadError(true)}
        />
      )}
    </>
  );
}

export default ImgLoad;
