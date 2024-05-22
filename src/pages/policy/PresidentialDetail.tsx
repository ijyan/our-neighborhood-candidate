import { useSearchParams } from 'react-router-dom';
import { PolicyDetail } from '@/components';

function PresidentialDetail() {
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  const partyName = query.get('partyName');
  return (
    <PolicyDetail
      pageNo={pageNo}
      numOfRows={10}
      sgId={20220309}
      partyName={partyName || ''}
      pageTitle="제20대 대통령선거 정당 정책"
    />
  );
}

export default PresidentialDetail;
