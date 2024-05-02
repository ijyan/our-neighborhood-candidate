import { Elections } from '@/components';
import { useSearchParams } from 'react-router-dom';

function Parliamentary() {
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  const sdName = query.get('sdName');
  const sggName = query.get('sggName');
  return (
    <section className="max-w-6xl m-auto px-12">
      <h2 className="text-center text-gray-800 text-5xl font-semibold py-32">
        제22대 국회의원 선거 당선인 공약
      </h2>
      {/* TODO: sgId 20240410으로 수정 */}
      <Elections
        pageNo={pageNo}
        numOfRows={12}
        sgId={20200415}
        sgTypecode={2}
        sdName={sdName || ''}
        sggName={sggName || ''}
      />
    </section>
  );
}

export default Parliamentary;
