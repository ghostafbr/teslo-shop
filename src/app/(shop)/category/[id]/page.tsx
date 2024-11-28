// import { notFound } from 'next/navigation';

import {ProductGrid, Title} from '@/components';
import {Product, Category} from '@/interfaces';
import {initialData} from '@/seed/seed';

const seedProducts: Product[] = initialData.products;

interface Props {
    params: {
        id: Category;
    }
}

const CategoryPage = ({ params }: Props) => {
    const { id } = params;
    const products: Product[] = seedProducts.filter(product => product.gender === id);

    const labels: Record<Category, string>= {
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
                title={`${labels[id]}'s category`}
                subtitle='All the products'
                className='mb-2'
            />
            <ProductGrid products={products} />
        </>
    );
};

CategoryPage.displayName = 'CategoryPage';

export default CategoryPage;
