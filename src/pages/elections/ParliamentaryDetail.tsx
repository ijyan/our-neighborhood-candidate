import { useSearchParams } from 'react-router-dom';
import { ElectionsDetail } from '@/components';

function ParliamentaryDetail() {
  const [query] = useSearchParams();
  const sdName = query.get('sdName');
  const sggName = query.get('sggName');

  return (
    <ElectionsDetail
      pageNo={1}
      numOfRows={1}
      sgId={20240410}
      sgTypecode={2}
      sdName={sdName || ''}
      sggName={sggName || ''}
      pageTitle="제22대 국회의원 선거 당선인 공약"
    />
  );
}

export default ParliamentaryDetail;
