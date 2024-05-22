import { useSearchParams } from 'react-router-dom';
import { PolicyDetail } from '@/components';

function ParliamentaryDetail() {
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  const partyName = query.get('partyName');
  return (
    <PolicyDetail
      pageNo={pageNo}
      numOfRows={10}
      sgId={20240410}
      partyName={partyName || ''}
      pageTitle="제22대 국회의원 선거 정당 정책"
    />
  );
}

export default ParliamentaryDetail;
