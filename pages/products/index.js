import { useRouter } from 'next/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

function ProductPage() {
  const { query } = useRouter();
  console.log(typeof query.page);
  const page = parseInt(query.page) || 1;

  return (
    <div>
      <Pagination page={page} />
      <Products page={page} />
      <Pagination page={page} />
    </div>
  );
}
export default ProductPage;
