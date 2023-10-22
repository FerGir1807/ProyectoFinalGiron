import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, getDocs, query, where, collection } from 'firebase/firestore'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

export const Orders = () => {

    var [orders, setOrders] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const ordersCollection = collection(db, "orders");

        getDocs(ordersCollection)
            .then(snapshot => {
                const orders = snapshot.docs.map(document => ({
                    id: document.id, ...document.data()
                }));
                setOrders(orders);
            })
            .catch(error => console.log("Error al obtener los productos:" + error))
    }, []);
    return (
        <>
            <h1 style={{ textAlign: "center" }}>Ordenes</h1>
            <Container>
                {orders.map((order) => {
                    return (
                        <Row>
                            <h6>ID orden: {order.id}</h6>
                            <h6>Total: ${order.totalPrice}</h6>
                            <h6>Productos totales: {order.totalProducts}</h6>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID Producto</th>
                                        <th>Nombre</th>
                                        <th>Cantidad</th>
                                        <th>Precio</th>
                                    </tr>
                                </thead>
                                {order.items.map((orderItems) => {
                                    return (
                                        <tbody>
                                            <tr>
                                                <td>{orderItems.itemId}</td>
                                                <td>{orderItems.name}</td>
                                                <td>{orderItems.selectedProducts}</td>
                                                <td>${orderItems.price}</td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </Table>

                            <hr />
                        </Row>
                    )

                })}
            </Container>

        </>
    )
}
