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
            <h2>Made Fresh with Only the Finest Ingredients</h2>
            <ProductsWrapper>
                {products.map((p, i) =>
                    <ProductWrapper key={i}>
                        <Link to={`/products/${p.id}`}>
                            <Typography variant={"h5"} style={{ marginBottom: 10 }}>{p.name}</Typography>
                            <img src={p.imageUrl} alt={p.name} width={300} height={300} />
                            <BottomInfo>
                                <Typography>${p.price} </Typography>
                                <Typography>Get the deets ></Typography>
                            </BottomInfo>

                        </Link>
                    </ProductWrapper>
                )}
            </ProductsWrapper>
        </>
    );
}

export default Products;

const ProductsWrapper = styled.div`
    //border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    margin: 50px 0;
`;

const ProductWrapper = styled.div`
    //border: 1px solid red;
    margin-right: 40px;
    margin-bottom: 40px;
    a {
      text-decoration: none;
      color: #282c34;
    }
`;

const BottomInfo = styled.div`
    display: flex;
    justify-content: space-between;
    p:nth-child(2) {
      color: blue;
      text-decoration: underline;
    }
`;



