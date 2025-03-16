import {OrderSummary} from '@/app/(shop)/cart/ui/OrderSummary';
import {ProductsInCart} from '@/app/(shop)/cart/ui/ProductsInCart';
import {Title} from '@/components';
import Link from 'next/link';

export default function CartPage() {

    return (

        <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

            <div className=" flex flex-col w-[1000px]">

                <Title title={'Cart'}/>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* Cart*/}
                    <div className="flex flex-col mt5">
                        <span className="text-xl">Add more items</span>
                        <Link href="/" className="underline mb-5">Continue Shopping</Link>
                        {/*items*/}
                        <ProductsInCart/>
                    </div>
                    {/*Checkout*/}
                    <OrderSummary/>

                </div>
            </div>
        </div>
    );
};
