import React, { useState, useEffect } from 'react';
import ItemCard from '../item/ItemCard';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore'
import Container from 'react-bootstrap/Container';

const Home = (props) => {
    var [products, setProducts] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const productsCollection = collection(db, "products");

        getDocs(productsCollection)
            .then(snapshot => {
                const productsList = snapshot.docs.map(document => ({
                    id: document.id, ...document.data()
                }));
                setProducts(productsList);
            })
            .catch(error => console.log("Error al obtener los productos:" + error))

    }, []);

    return (

        <Container>
            <h4 style={{ textAlign: "center" }}>{props.greeting}</h4>
            {products.map((item) => {
                return <ItemCard key={item.id} id={item.id} name={item.name} image={item.image}></ItemCard>
            })}
        </Container>


    )
}

export default Home