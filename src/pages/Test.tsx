import '../index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface IProps {
  krName: string;
  prmmCont1: string;
}

function Test() {
  const [data, setData] = useState<IProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/9760000/ElecPrmsInfoInqireService/getCnddtElecPrmsInfoInqire?serviceKey=YguG8Utmhixb2YRzjTea7hXzHttvUJTKa18%2B%2BVu0FfvwEEcO3p5YYT8MOPI8z8u5iBJIB4tfmI8kUQbJ3Y8HzA%3D%3D&pageNo=1&numOfRows=10&sgId=20231011&sgTypecode=4&cnddtId=100150999&resultType=json`,
        );
        setData(response.data.response.body.items.item);
        console.log(response.data.response.body.items.item);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="text-2xl font-bold underline">alskdjf</div>
      <div>
        {data.map(item => (
          <>
            <h3>{item.krName}</h3>
            <div>
              {item.prmmCont1.split('\n').map(desc => (
                <p>{desc}</p>
              ))}
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Test;
