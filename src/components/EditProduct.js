import React, {useEffect, useState} from 'react';
import {API, Auth} from "aws-amplify";
import {
    useParams
} from "react-router-dom";

const EditProduct = (props) => {
    const [product, setProduct] = useState({});
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const results = await API.get('capstonerestapi', `/products/${params.id}`);
                console.log('results', results);
                setProduct(results.product);
            } catch (error) {
                console.log('error fetching data..', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            Edit Product
        </>
    );
}

export default EditProduct;
