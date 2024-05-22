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
      sgId={20220309}
      sgTypecode={1}
      sdName={sdName || ''}
      sggName={sggName || ''}
      pageTitle="제20대 대통령선거 당선인 공약"
    />
  );
}

export default ParliamentaryDetail;
