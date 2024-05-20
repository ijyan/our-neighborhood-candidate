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
        제20대 대통령 선거 당선인 공약
      </h2>
      <Elections
        pageNo={pageNo}
        numOfRows={12}
        sgId={20220309}
        sgTypecode={1}
        sdName={sdName || ''}
        sggName={sggName || ''}
      />
    </section>
  );
}

export default Parliamentary;
