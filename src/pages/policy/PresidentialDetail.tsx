import { useParams, useSearchParams } from 'react-router-dom';
import { PolicyDetail } from '@/components';

function PresidentialDetail() {
  const { jdName } = useParams();
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  return (
    <PolicyDetail
      pageNo={pageNo}
      numOfRows={10}
      sgId={20220309}
      partyName={jdName}
    />
  );
}

export default PresidentialDetail;
