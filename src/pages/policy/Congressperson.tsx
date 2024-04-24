import { Policy } from '@/components';

function Congressperson() {
  return (
    <section className="max-w-6xl m-auto px-12">
      <h2 className="text-center text-gray-800 text-5xl font-semibold py-32">
        제22대 국회의원 선거 정당 정책
      </h2>
      <Policy sgId={20240410} />
    </section>
  );
}

export default Congressperson;
