import { Elections } from '@/components';
import { useSearchParams } from 'react-router-dom';

function Parliamentary() {
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  const sdName = query.get('sdName');
  const sggName = query.get('sggName');
  return (
    <section className="max-w-6xl m-auto px-6 md:px-8 lg:px-12">
      <h2 className="text-center font-bold text-gray-800 text-2xl pt-28 pb-14 md:pt-48 md:pb-32 md:text-4xl lg:text-5xl">
        제22대 국회의원 선거 당선인 공약
      </h2>
      <Elections
        pageNo={pageNo}
        numOfRows={12}
        sgId={20240410}
        sgTypecode={2}
        sdName={sdName || ''}
        sggName={sggName || ''}
      />
    </section>
  );
}

export default Parliamentary;
