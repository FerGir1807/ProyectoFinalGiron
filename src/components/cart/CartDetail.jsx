import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../cart/CartContext';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { doc, getDoc, getFirestore, addDoc, collection } from 'firebase/firestore'
import Swal from 'sweetalert2'

export const CartDetail = () => {

    const cartContext = useContext(CartContext);
    const [items, setItems] = useState([]);
    const [cartDetails, setCartDetails] = useState({
        totalProducts: 0,
        totalPrice: 0
    });

    const createSelectOptions = (stock) => {
        const selectOptions = [];

        for (let i = 1; i <= stock; i++) {
            selectOptions.push(
                <option key={i} value={i}>{i}</option>
            )
        }
        return (
            selectOptions
        )
    };

    useEffect(() => {
        var totalProducts = 0;
        var totalPrice = 0;
        setItems(cartContext.cart);
        cartContext.cart.map((item) => {
            totalProducts = totalProducts + item.selectedProducts;
            totalPrice = totalPrice + (item.selectedProducts * item.price);
        })

        setCartDetails({
            totalProducts: totalProducts,
            totalPrice: totalPrice
        })
    }, [cartContext.cart]);


    const deleteItem = (itemId) => {
        cartContext.deleteItem(itemId);
    }

    const buyCartItems = () => {

        const order = {
            items: cartContext.cart,
            totalProducts: cartDetails.totalProducts,
            totalPrice: cartDetails.totalPrice
        }


        const db = getFirestore();
        const collectionRef = collection(db, "orders");


        addDoc(collectionRef, order)
            .then(res => {
                Swal.fire(
                    'Orden de compra',
                    '¡La orden se ha agregado correctamente!',
                    'success'
                );
                cartContext.resetCart();
            })
            .catch(error => {
                Swal.fire(
                    'Orden de compra',
                    'Se produjo un error al generar la orden, por favor inténtelo más tarde.',
                    'error'
                )
                console.error("Se produjo un error al generar la orden.", error)
            })

    }

    const editSelectedProducts = (event, item) => {

        item.selectedProducts = Number(event.target.value);
        cartContext.editItem(item);
    }

    if (items.length === 0) {
        return (
            <h4>
                No hay productos en el carrito
            </h4>
        )
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Productos</h1>
            <Container>
                {items.map((item) => {
                    return (
                        <Row key={item.itemId}>
                            <Col>
                                <p>{item.name}</p>
                            </Col>
                            <Col>
                                <Image src={item.image} thumbnail width={100} />
                            </Col>
                            <Col>
                                <p>
                                    {`Precio: $ ${item.price}`}
                                </p>
                                <Form.Select defaultValue={item.selectedProducts} onChange={(event) => { editSelectedProducts(event, item) }}>
                                    <option key={0} value={0}>Seleccione una cantidad</option>
                                    {createSelectOptions(item.stock)}
                                </Form.Select>
                            </Col>
                            <Col>
                                <Button variant="danger" onClick={() => { deleteItem(item.itemId) }}>Eliminar producto
                                </Button>
                            </Col>
                            <hr />
                        </Row>
                    )
                })}
                <Row>
                    <Col>
                        <h3>{`Subtotal (${cartDetails.totalProducts} productos): $${cartDetails.totalPrice}`}</h3>
                    </Col>
                    <Col>
                        <Button variant="success" onClick={buyCartItems}>Comprar
                        </Button>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
