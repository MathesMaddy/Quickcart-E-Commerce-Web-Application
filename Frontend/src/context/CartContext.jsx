import { createContext } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export const CartContext = createContext({});

export default function CartProvider ({ children }) {

    const [ cartProduct, setCartProduct ] = useLocalStorageState('cart', []);

    return ( 
        <CartContext.Provider value = {{ cartProduct, setCartProduct }} >
            { children }
        </CartContext.Provider>
    )
}