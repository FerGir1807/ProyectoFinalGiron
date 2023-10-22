import React, { useState, useEffect, useContext } from 'react'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import CartContext from '../cart/CartContext';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2'

export const ItemDetail = () => {

    const cartContext = useContext(CartContext);

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [selectValue, setSelectValue] = useState(0);
    const [disableOptions, setDisableOptions] = useState({
        disable: false,
        text: "Agregar al carrito"
    });

    useEffect(() => {
        const db = getFirestore();
        const item = doc(db, "products", productId);

        getDoc(item)
            .then((snapshot) => {
                setProduct({ id: productId, ...snapshot.data() })
            })
            .catch(error => console.log("Error al obtener el detalle del producto:" + error))
        const itemInCart = cartContext.cart.find(i => i.itemId === productId);
        if (itemInCart !== undefined) {
            setDisableOptions({
                disable: true,
                text: "Producto agregado al carrito"
            })
        }
    }, [cartContext.cart]);

    const addToCart = () => {
        if (selectValue === 0) {
            Swal.fire(
                'Productos',
                'Selecciona la cantidad de productos deseados.',
                'warning'
            )
        } else {
            cartContext.addItem({
                itemId: product.id,
                name: product.name,
                image: product.image,
                stock: product.stock,
                price: product.price,
                selectedProducts: Number(selectValue)
            })
            Swal.fire(
                'Productos',
                '¡El producto se agregó al carrito correctamente!',
                'success'
            )
        }
    }

    const createSelectOptions = () => {
        const selectOptions = [];

        for (let i = 1; i <= product.stock; i++) {
            selectOptions.push(
                <option key={i} value={i}>{i}</option>
            )
        }
        return (
            selectOptions
        )
    };

    return (
        <>
            <Container fluid>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <h2>
                            {product.name}
                        </h2>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <Image src={product.image} fluid />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <p>
                            {product.description}
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <h4>
                            Precio : ${product.price}
                        </h4>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <h4>
                            Stock : {product.stock} disponibles
                        </h4>
                        <Form.Select onChange={
                            e => {
                                setSelectValue(e.target.value)
                            }
                        } disabled={disableOptions.disable}>
                            <option key={0} value={0}>Seleccione una cantidad</option>
                            {createSelectOptions()}
                        </Form.Select>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <Button variant="primary" onClick={addToCart} disabled={disableOptions.disable}>{disableOptions.text}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
