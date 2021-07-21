import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify'
import styled from 'styled-components';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('in fetchData');
                const results = await API.get('capstonerestapi', '/products');
                console.log('results', results);
                setProducts(results.products);
            } catch (error) {
                console.log('error fetching data..', error);
            }
        }

        fetchData();
    }, []);

    if (products.length <= 0) {
        return <CircularProgress />;
    }

    return (
        <>
            <h2>Our Amazing Sandwiches</h2>
            <ProductsWrapper>
                {products.map((p, i) =>
                    <Link to={`/products/${p.id}`}>
                        <ProductWrapper key={i}>
                            <Typography variant={"h5"}>{p.name}</Typography>
                            <img src={p.imageUrl} alt={p.name} width={300} height={300} />
                            <Typography>$ {p.price}</Typography>
                        </ProductWrapper>
                    </Link>
                )}
            </ProductsWrapper>
        </>
    );
}

export default Products;

const ProductsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ProductWrapper = styled.div`
    //border: 1px solid red;
    margin: 20px;
`;

