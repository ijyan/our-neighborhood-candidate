import { useParams } from 'react-router-dom';
import { PolicyDetail } from '@/components';

function CongresspersonDetail() {
  const { jdName } = useParams();
  return <PolicyDetail numOfRows={10} sgId={20240410} partyName={jdName} />;
}

export default CongresspersonDetail;
