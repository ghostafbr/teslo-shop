import {CartProduct} from '@/interfaces';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSummaryInfo: () => { totalItems: number; subtotal: number; taxes: number; total: number };
    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProduct: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
    persist(
        (set, get) => ({
            cart: [],

            getTotalItems: (): number => {
                const {cart} = get();
                if (cart.length === 0) {
                    return 0;
                }

                return cart.reduce((acc: number, item: CartProduct) => acc + item.quantity, 0);
            },

            getSummaryInfo: (): { totalItems: number; subtotal: number; taxes: number; total: number } => {
                const {cart} = get();
                if (cart.length === 0) {
                    return {
                        totalItems: 0,
                        subtotal: 0,
                        taxes: 0,
                        total: 0
                    };
                }

                const totalItems: number = cart.reduce((acc: number, item: CartProduct) => acc + item.quantity, 0);
                const subtotal: number = cart.reduce((acc: number, item: CartProduct) => acc + item.price * item.quantity, 0);
                const taxes: number = subtotal * 0.15;
                const total: number = subtotal + taxes;

                return {
                    totalItems,
                    subtotal,
                    taxes,
                    total
                }
            },

            addProductToCart: (product: CartProduct) => {
                const {cart} = get();

                // 1. Check if the product is already in the cart
                const productInCart: boolean = cart.some(
                    (item: CartProduct) => item.id === product.id && item.size === product.size
                );

                if (!productInCart) {
                    set({cart: [...cart, product]});
                    return;
                }

                // 2. I know that the product exists by size and id... so I need to update the quantity
                const updatedCart: CartProduct[] = cart.map((item: CartProduct) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        };
                    }

                    return item;
                });

                set({cart: updatedCart});

            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const {cart} = get();

                const updatedCart: CartProduct[] = cart.map((item: CartProduct) => {
                    if (item.id === product.id && item.size === product.size) {
                        return {...item, quantity};
                    }

                    return item;
                });

                set({cart: updatedCart});
            },

            removeProduct: (product: CartProduct) => {
                const {cart} = get();
                const updatedCart: CartProduct[] = cart.filter(
                    (item: CartProduct) => item.id !== product.id || item.size !== product.size
                );

                set({cart: updatedCart});
            }

        }),
        {
            name: 'shoping-cart',
        }
    )
);
