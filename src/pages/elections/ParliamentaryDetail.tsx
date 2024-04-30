import { useParams } from 'react-router-dom';
import { ElectionsDetail } from '@/components';

function ParliamentaryDetail() {
  const { huboid } = useParams();
  console.log(huboid);
  return (
    <>
      <div>{huboid}</div>
      <ElectionsDetail huboid={huboid} />
    </>
  );
}

export default ParliamentaryDetail;
