import { useParams } from 'react-router-dom';
import { PolicyDetail } from '@/components';

function PresidentDetail() {
  const { jdName } = useParams();
  return <PolicyDetail numOfRows={10} sgId={20220309} partyName={jdName} />;
}

export default PresidentDetail;
