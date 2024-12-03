export const revalidate: boolean = false;
import {getPaginatedProductsWithImages} from '@/actions';
import {Pagination, ProductGrid, Title} from '@/components';
import {Gender} from '@prisma/client';
import {redirect} from 'next/navigation';

interface Props {
    params: Promise<{
        gender: string;
    }>,
    searchParams: Promise<{
        page?: string;
    }>
}

const GenderPage = async ({params, searchParams}: Props) => {
    const {gender} = await params;
    const { page: pageParam } = await searchParams;
    const page: number = pageParam ? parseInt(pageParam) : 1;

    const {products, totalPages} = await getPaginatedProductsWithImages({
        page,
        gender: gender as Gender,
    });


    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string> = {
        'men': 'For men',
        'women': 'For women',
        'kid': 'For kids',
        'unisex': 'For everyone',
    };

    /*if (id === 'kids') {
        notFound();
    }*/

    return (
        <>
            <Title
                title={`${labels[gender]}'s category`}
                subtitle="All the products"
                className="mb-2"
            />
            <ProductGrid
                products={products}
            />
            <Pagination totalPages={totalPages}/>
        </>
    );

};

GenderPage.displayName = 'CategoryPage';

export default GenderPage;
