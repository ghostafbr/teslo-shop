import {ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector} from '@/components';
import {notFound} from 'next/navigation';
import {titleFont} from '@/config/fonts';
import {initialData} from '@/seed/seed';
import {Product} from '@/interfaces';

interface Props {
    params: {
        slug: string;
    }
}

const ProductPage = ({params}: Props) => {

    const { slug } = params;
    const product: Product | undefined = initialData.products.find(product => product.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

            {/*SlideShow*/}
            <div className='col-span-1 md:col-span-2'>

                {/*Mobile Slideshow*/}
                <ProductMobileSlideShow
                    images={product?.images}
                    title={product?.title}
                    className='block md:hidden'
                />

                {/*desktop slideshow*/}
                <ProductSlideShow
                    images={product?.images}
                    title={product?.title}
                    className='hidden md:block'
                />
            </div>

            {/*Details*/}
            <div className='col-span-1 px-5'>
                <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
                    {product?.title}
                </h1>
                <p className='text-lg mb-5'>${product.price}</p>

                {/*Size selector*/}
                <SizeSelector
                    selectedSize={product.sizes[0]}
                    availableSizes={product.sizes}
                />

                {/*Qt selector*/}
                <QuantitySelector
                    quantity={2}
                />

                {/*Button*/}
                <button className='btn-primary my-5'>
                    Add to cart
                </button>

                {/*Description*/}
                <h3 className='font-bold text-sm'>Description</h3>
                <p className='font-light'>
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductPage;
