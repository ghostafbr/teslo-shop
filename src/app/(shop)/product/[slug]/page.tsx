export  const revalidate = 604800;

import {ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel} from '@/components';
import {Metadata, ResolvingMetadata} from 'next';
import {getProductBySlug} from '@/actions';
import {notFound} from 'next/navigation';
import {titleFont} from '@/config/fonts';
import {Product} from '@/interfaces';

interface Props {
    params: Promise<{
        slug: string;
    }>
}

export async function generateMetadata(
    { params, }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug: string = (await params).slug

    // fetch data
    const product = await getProductBySlug(slug);

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Product not found',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Product not found',
            description: product?.description ?? '',
            // images: ['/some-specific-page-image.jpg', ...previousImages], // https://miweb.com/product/image.png
            images: [`/products/${product?.images[1]}`],
        },
    }
}


const ProductPage = async ({params}: Props) => {

    const { slug } =  await params;
    const product: Product | null = await getProductBySlug(slug);

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

                <StockLabel slug={product.slug}/>
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
