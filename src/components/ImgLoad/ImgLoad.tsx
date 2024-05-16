import { useState } from 'react';

interface IProp {
  url?: string | undefined;
  otherStyle?: string;
  alt?: string;
}

function ImgLoad({ url, otherStyle, alt }: IProp) {
  const [loadError, setLoadError] = useState(false);

  return (
    <>
      {loadError ? (
        <>
          {/* <span className={`nanum-neo text-gray-300 text-center ${otherStyle}`}> */}
          {/*  이미지가 없습니다. */}
          {/* </span> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 59 59"
            width="30"
            height="30"
          >
            <title>image</title>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_1-2" data-name="Layer 1">
                <g id="image">
                  <path
                    fill="#d1d5db"
                    d="M48.5,59h-38A10.51,10.51,0,0,1,0,48.5v-38A10.51,10.51,0,0,1,10.5,0h38A10.51,10.51,0,0,1,59,10.5v38A10.51,10.51,0,0,1,48.5,59ZM10.5,5A5.51,5.51,0,0,0,5,10.5v38A5.51,5.51,0,0,0,10.5,54h38A5.51,5.51,0,0,0,54,48.5v-38A5.51,5.51,0,0,0,48.5,5Z"
                  />
                  <path
                    fill="#d1d5db"
                    d="M2.5,49.52A2.5,2.5,0,0,1,.73,45.26L17.4,28.59a2.5,2.5,0,0,1,3.54,0l6.5,6.49L40.31,22.21a2.5,2.5,0,0,1,3.54,0L58.27,36.63a2.5,2.5,0,0,1-3.54,3.53L42.08,27.51,29.2,40.39a2.5,2.5,0,0,1-3.53,0l-6.5-6.5L4.27,48.79A2.49,2.49,0,0,1,2.5,49.52Z"
                  />
                  <circle fill="#d1d5db" cx="27.28" cy="17.86" r="4" />
                </g>
              </g>
            </g>
          </svg>
        </>
      ) : (
        <img
          className={otherStyle}
          src={url}
          alt={alt}
          onError={() => setLoadError(true)}
          loading="lazy"
        />
      )}
    </>
  );
}

export default ImgLoad;
