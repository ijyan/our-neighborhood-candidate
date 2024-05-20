import { Policy } from '@/components';
import { useSearchParams } from 'react-router-dom';

function Presidential() {
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  return (
    <section className="max-w-6xl m-auto px-6 md:px-8 lg:px-12">
      <h2 className="text-center font-bold text-gray-800 text-xl py-14 md:py-16 md:text-4xl lg:text-5xl lg:py-32">
        제20대 대통령선거 정당 정책
      </h2>
      <Policy sgId={20220309} pageNo={pageNo} numOfRows={12} />
    </section>
  );
}

export default Presidential;
