'use client';

import {QuantitySelector} from '@/components';
import {CartProduct} from '@/interfaces';
import Image from 'next/image';
import {useCartStore} from '@/store';
import Link from 'next/link';
import {useEffect, useState} from 'react';

export const ProductsInCart = () => {

    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
    const removeProduct = useCartStore((state) => state.removeProduct);
    const [loaded, setLoaded] = useState(false);
    const productsInCart: CartProduct[] = useCartStore((state) => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            {
                productsInCart.map((product: CartProduct) => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Image
                            src={`/products/${product.image}`}
                            style={{
                                width: '100px',
                                height: '100px',
                            }}
                            alt={product.title}
                            width={100}
                            height={100}
                            className="mr-5 rounded-none"
                        />
                        <div>
                            <Link
                                className={'hover:underline cursor-pointer' }
                                href={`/product/${product.slug}`}>
                                <p>{product.size} - {product.title}</p>
                            </Link>
                            <p>${product.price}</p>
                            <QuantitySelector quantity={product.quantity} onQuantityChanged={(quantity: number) => updateProductQuantity(product, quantity) }/>
                            <button className="underline mt-3" onClick={() => removeProduct(product)}>Remove</button>
                        </div>
                    </div>
                ))
            }
        </>
    );
};
