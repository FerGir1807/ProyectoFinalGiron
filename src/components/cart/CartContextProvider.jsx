import React, { useState } from 'react'
import CartContext from './CartContext'

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([]);

    const addItem = (newItem) => {

        let duplicatedItem = cart.filter(i => i.itemId == newItem.itemId);
        if (duplicatedItem == "") {
            setCart([
                ...cart,
                newItem
            ])
        }
    }
    const deleteItem = (itemId) => {
        const filteredItems = cart.filter(item => item.itemId !== itemId);

        setCart(
            filteredItems
        )

    }
    const editItem = (modifiedItem) => {

        const filteredItems = cart.filter(item => item.itemId !== modifiedItem.itemId);
        filteredItems.push(modifiedItem);

        setCart(
            filteredItems
        )
    }

    const resetCart = () => {

        setCart(
            []
        )
    }

    const values = {
        cart,
        addItem,
        editItem,
        deleteItem,
        resetCart
    }

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )
}
