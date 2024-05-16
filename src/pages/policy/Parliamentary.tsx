import { Policy } from '@/components';
import { useSearchParams } from 'react-router-dom';

function Parliamentary() {
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  return (
    <section className="max-w-6xl m-auto px-12">
      <h2 className="text-center text-gray-800 text-5xl font-semibold py-32">
        제22대 국회의원 선거 정당 정책
      </h2>
      <Policy sgId={20240410} pageNo={pageNo} numOfRows={12} />
    </section>
  );
}

export default Parliamentary;
