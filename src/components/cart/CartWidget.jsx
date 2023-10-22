import CartContext from "./CartContext"
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const CartWidget = () => {

    const cartContext = useContext(CartContext);
    var [amount, setAmount] = useState(0);
    var totalProducts = 0;

    useEffect(() => {
        cartContext.cart.map((item) => {
            totalProducts = totalProducts + Number(item.selectedProducts)
        })
        setAmount(totalProducts)
    }, [cartContext.cart]);

    return (
        <>

            <h4>{amount}
                <Link to={"/cart"}>
                    <i className="bi bi-cart"></i>
                </Link>

            </h4>
        </>
    )
}
export default CartWidget