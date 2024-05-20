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
    />
  );
}

export default ParliamentaryDetail;