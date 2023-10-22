import React, { useState, useEffect } from 'react';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';
import { getFirestore, getDocs, query, where, collection } from 'firebase/firestore'

const ItemListContainer = (props) => {

    const { categoryId } = useParams();
    var [products, setProducts] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const productsCollection = collection(db, "products");

        const q = query(productsCollection, where("category", "==", categoryId))

        getDocs(q)
            .then(snapshot => {
                const productsList = snapshot.docs.map(document => ({
                    id: document.id, ...document.data()
                }));
                setProducts(productsList);
            })
            .catch(error => console.log("Error al obtener los productos:" + error))

    }, [categoryId]);

    return (
        <>
            <h1 style={{ textAlign: "center" }}>Bienvenido a la sección de {categoryId}</h1>
            {products.map((item) => {
                return <ItemCard key={item.id} id={item.id} name={item.name} image={item.image}></ItemCard>
            })}
        </>

    )
}
export default ItemListContainer

