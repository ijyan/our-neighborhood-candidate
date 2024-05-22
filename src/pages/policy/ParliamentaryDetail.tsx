import { useParams, useSearchParams } from 'react-router-dom';
import { PolicyDetail } from '@/components';
import { Helmet } from 'react-helmet-async';

function ParliamentaryDetail() {
  const { jdName } = useParams();
  const [query] = useSearchParams();
  const pageNo = parseInt(query.get('pageNo') || '1', 10);
  return (
    <>
      <Helmet>
        <title>{jdName} | 제22대 국회의원 선거 정당 정책 - 우리동네일꾼</title>
      </Helmet>
      <PolicyDetail
        pageNo={pageNo}
        numOfRows={10}
        sgId={20240410}
        partyName={jdName}
        pageTitle="제22대 국회의원 선거 정당 정책"
      />
    </>
  );
}

export default ParliamentaryDetail;
