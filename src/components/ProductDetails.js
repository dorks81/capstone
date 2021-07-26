import React, {useEffect, useState} from 'react';
import {API, Auth} from "aws-amplify";
import {
    useParams
} from "react-router-dom";
import {Typography} from "@material-ui/core";

const blankProduct = {
    id: null,
    name: '',
    price: '',
    imageUrl: '',
}

const ProductDetails = () => {
    const [product, setProduct] = useState(blankProduct);
    const params = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const results = await API.get('capstonerestapi', `/products/${params.id}`);
                console.log('results', results);
                setProduct(results.data.Item);
            } catch (error) {
                console.log('error fetching data..', error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <img src={product.imageUrl} style={{ marginTop: 25, marginBottom: 10 }}/>
            <Typography variant={"h3"} style={{ marginBottom: 10 }}>{product.name}</Typography>
            <Typography variant={"body1"}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
            <Typography variant={"body1"}>{product.price}</Typography>
        </>
    );
}

export default ProductDetails;
