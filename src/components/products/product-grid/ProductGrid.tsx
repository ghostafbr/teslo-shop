import {ProductGridItem} from '@/components';
import {Product} from '@/interfaces';

interface Props {
    products: Product[];
}

export const ProductGrid = ({products}: Props) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
            {
                products.map((product:Product) => (
                    <ProductGridItem key={product.slug} product={product} />
                ))
            }

        </div>
    );
};