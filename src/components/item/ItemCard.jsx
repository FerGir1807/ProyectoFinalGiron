import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { ItemDetail } from './ItemDetail';
import { Routes, Route, Link, Router } from 'react-router-dom';

const ItemCard = (props) => {
    return (<>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Link to={`/item/${props.id}`}>
                    <Button variant="primary">Ver detalle
                    </Button>
                </Link>
            </Card.Body>
        </Card>
        <Routes>
            <Route path="item/:itemId" element={<ItemDetail id={props.id} />} />
        </Routes>
    </>
    );
}
export default ItemCard