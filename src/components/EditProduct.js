import React, { useEffect, useState } from 'react';
import { API } from "aws-amplify";
import {
    useParams
} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const EditProduct = (props) => {
    const [product, setProduct] = useState({});
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

    const handleChange = (value, name) => {
        setProduct({ ...product, [name]: value });
    }

    const handleSubmit = async () => {
        try {
            await API.post('capstonerestapi', `/products/${params.id}`, {
                body: product
            });
            alert("Updated product successfully!");
        } catch (error) {
            console.log('error udpating product..', error);
        }
    }

    return (
        <>
            <Typography variant={"h3"} style={{ marginTop: 30 }}>
                Edit Sandwich
            </Typography>
            <div style={{ marginTop: 30 }}>
                <TextField
                    fullWidth
                    label="Name"
                    value={product.name}
                    onChange={(e) => handleChange(e.target.value,'name')}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <div style={{ marginTop: 30 }}>
                <TextField
                    fullWidth
                    label="Price"
                    value={product.price}
                    onChange={(e) => handleChange(e.target.value, 'price')}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <div style={{ marginTop: 30, marginBottom: 30 }}>
                <TextField
                    fullWidth
                    label="Image URL"
                    value={product.imageUrl}
                    onChange={(e) => handleChange(e.target.value, 'imageUrl')}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
            <Button
                onClick={handleSubmit}
                style={{ margin: '0 5px' }}
                color={'primary'}
                variant='contained'
            >Update</Button>
        </>
    );
}

export default EditProduct;
