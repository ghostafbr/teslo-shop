import {initialData} from '@/seed/seed';
import {Product} from '@/interfaces';
import {Title} from '@/components';
import Image from 'next/image';
import Link from 'next/link';

const productsInCart: Product[] = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function () {
    return (
        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">


            <div className=" flex flex-col w-[1000px]">

                <Title title='Checkout'/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Cart*/}
                    <div className="flex flex-col mt5">
                        <span className="text-xl">Adjust your cart</span>
                        <Link href="/cart" className="underline mb-5">Edit Cart</Link>


                        {/*items*/}
                        {
                            productsInCart.map((product) => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
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
                                        <p>{product.title}</p>
                                        <p>${product.price} x 3</p>
                                        <p className='font-bold'>Subtotal: ${product.price * 3}</p>
                                        <button className="underline mt-3">Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {/*Checkout*/}
                    <div className='bg-white rounded-xl shadow-xl p-7'>

                        <h2 className='text-2xl mb-2'> Delivery Address</h2>
                        <div className='mb-10'>
                            <p className='text-xl'>Andrés Bolaños</p>
                            <p>Av. Siempreviva 123</p>
                            <p>Cali, Valle del Cauca</p>
                            <p>Colombia</p>
                            <p>p 760021</p>
                            <p>123123123</p>
                        </div>

                        {/*Divider*/}
                        <div className='w-full h-0.5 rounded bg-gray-200 mb-10'>

                        </div>

                        <h2 className='text-2xl mb-2 '>Checkout</h2>

                        <div className="grid grid-cols-2">
                            <span>No. of items</span>
                            <span className="text-right">3 items</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>Taxes (15%)</span>
                            <span className="text-right">$ 100</span>

                            <span className='mt-5 text-2xl'>Total:</span>
                            <span className="mt-5 text-2xl text-right">$ 100</span>
                        </div>

                        <div className='mt-5 mb-2 w-full'>
                            {/*disclaimer*/}
                            <span className='text-xs'>
                                <a href='#' className='underline'>By clicking on the button below, you agree to our Terms of Service and Privacy Policy.</a>
                            </span>

                            <Link href='/orders/qweqwe123' className='flex btn-primary justify-center'>Proceed to Payment</Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};
