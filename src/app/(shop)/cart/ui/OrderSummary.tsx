'use client';

import { useCartStore } from '@/store';
import {currencyFormat} from '@/utils';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useShallow} from 'zustand/react/shallow';

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false);
    const {totalItems, subtotal, taxes, total} = useCartStore(useShallow(state => state.getSummaryInfo()));

    useEffect(() => {setLoaded(true)},[]);

    if (!loaded) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className='bg-white rounded-xl shadow-xl p-7 h-[300px]'>
                <h2 className='text-2xl mb-2 '>Checkout</h2>

                <div className="grid grid-cols-2">
                    <span>No. of items</span>
                    <span className="text-right">{totalItems === 1 ? '1 item' : `${totalItems} items`}</span>

                    <span>Subtotal</span>
                    <span className="text-right">{currencyFormat(subtotal)}</span>

                    <span>Taxes (15%)</span>
                    <span className="text-right">{currencyFormat(taxes)}</span>

                    <span className='mt-5 text-2xl'>Total:</span>
                    <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
                </div>
                <div className='mt-5 mb-2 w-full'>
                    <Link href='/checkout/address' className='flex btn-primary justify-center'>Checkout</Link>
                </div>
            </div>
        </>
    );
};
