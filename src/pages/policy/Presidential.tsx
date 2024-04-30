import { Policy } from '@/components';

function Presidential() {
  return (
    <section className="max-w-6xl m-auto px-12">
      <h2 className="text-center text-gray-800 text-5xl font-semibold py-32">
        제20대 대통령선거 정당 정책
      </h2>
      <Policy sgId={20220309} />
    </section>
  );
}

export default Presidential;
