import React, { useEffect, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState({});

    const getData = () => {

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.log("Error al obtener los datos:" + error))
    }

    useEffect(() => {
        getData()
    }, []);

    return [data]
}

export default useFetch