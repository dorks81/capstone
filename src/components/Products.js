import React, {useEffect, useState} from 'react';
import { API } from 'aws-amplify'
import styled from 'styled-components';
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import CreateIcon from '@material-ui/icons/Create';
import Button from "@material-ui/core/Button";
import ChevronRightTwoToneIcon from '@material-ui/icons/ChevronRightTwoTone';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                console.log('in fetchData');
                const results = await API.get('capstonerestapi', '/products');
                console.log('results', results);
                setProducts(results.data.Items);
            } catch (error) {
                console.log('error fetching data..', error);
            }
        }

        fetchData();
    }, []);

    if (products.length <= 0) {
        return <LoadingWrapper>
            <CircularProgress size={180} />
        </LoadingWrapper>;
    }

    return (
        <>
            <h2 style={{ color: '#263846' }}>Made Fresh with Only the Finest Ingredients</h2>
            <ProductsWrapper>
                {products.map((p, i) =>
                    <ProductWrapper key={i}>
                        <Link to={`/products/${p.id}`}>
                            <Typography variant={"h4"} style={{ marginBottom: 10 }}>{p.name}</Typography>
                            <img src={p.imageUrl} alt={p.name} width={300} height={300}/>
                            <BottomInfo>
                                <Button variant="contained" color="primary">Order now <ChevronRightTwoToneIcon /> </Button>
                                <Typography variant="h5">${p.price}</Typography>
                            </BottomInfo>
                            <EditIcon>
                                <Link to={`/products/${p.id}/edit`}>
                                    <CreateIcon color="secondary"/>
                                </Link>
                            </EditIcon>
                        </Link>
                    </ProductWrapper>
                )}
            </ProductsWrapper>
        </>
    );
}

export default Products;

const LoadingWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

const EditIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  display: none;
  padding: 5px;
  &:hover {
    background-color: #eee;
    
  }
`;

const ProductsWrapper = styled.div`
    //border: 1px solid red;
    display: flex;
    flex-wrap: wrap;
    margin: 50px 0;
`;

const ProductWrapper = styled.div`
    //border: 1px solid red;
    position: relative;
    margin-right: 40px;
    margin-bottom: 40px;
    a {
      text-decoration: none;
      color: #282c34;
    }
    &:hover {
      ${EditIcon} {
        display: block;
      }
    }
`;

const BottomInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;

    p:nth-child(1) {
      display: flex;
      align-items: center;
      color: blue;
      text-decoration: underline;
    }
`;



