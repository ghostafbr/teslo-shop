export const revalidate: boolean = false;

import {getPaginatedProductsWithImages} from '@/actions';
import {Pagination, ProductGrid, Title} from '@/components';
import {redirect} from 'next/navigation';

interface Props {
    searchParams: Promise<{
        page?: string;
    }>
}

export default  async function Home({searchParams}: Props) {

    const { page: pageParam } = await searchParams;
    const page: number = pageParam ? parseInt(pageParam) : 1;

    const {products, totalPages} = await  getPaginatedProductsWithImages({page});

    if ( products.length === 0 ) {
        redirect('/')
    }

    return (
     <>
         <Title title='Store'  subtitle='All the products' className='mb-2'/>
         <ProductGrid products={products} />

         <Pagination totalPages={ totalPages } />
     </>
    );
}
