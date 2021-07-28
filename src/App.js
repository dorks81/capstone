import './App.css';
import React from "react";
import { withAuthenticator } from '@aws-amplify/ui-react'
import { Auth } from 'aws-amplify'
import { useState, useEffect } from 'react'
import Products from "./components/Products";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import EditProduct from "./components/EditProduct";
import CreateProduct from "./components/CreateProduct";
import Profile from "./components/Profile";
import ProductDetails from "./components/ProductDetails";
import {Typography} from "@material-ui/core";
import styled from 'styled-components';
import UserMenu from "./components/UserMenu";

export const UserContext = React.createContext();

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function checkUser() {
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
        }
        checkUser();
    }, [])

    if (!user) return null;

    return (
        <Router>
            <UserContext.Provider value={user}>
                <PageWrapper>
                    <Header>
                        <Typography variant={"h1"}>
                            <Link to="/" style={{ textDecoration: 'none', color: '#01807e' }}>
                                Bob's&nbsp;
                                <span style={{ color: '' }}>A</span>
                                <span style={{color: ''}}>m</span>
                                <span style={{color: ''}}>a</span>
                                <span style={{color: ''}}>z</span>
                                <span style={{color: ''}}>i</span>
                                <span style={{color: ''}}>n</span>
                                <span style={{color: '>'}}>g</span>
                                &nbsp;Sandwiches
                            </Link>
                        </Typography>
                        <Typography variant={"body1"}>
                            <UserMenu />
                        </Typography>
                    </Header>
                    <Switch>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/products/:id/edit">
                            <EditProduct />
                        </Route>
                        <Route path="/products/:id">
                            <ProductDetails />
                        </Route>
                        <Route exact path="/products">
                            <Products />
                        </Route>
                        <Route path="/products/new">
                            <CreateProduct />
                        </Route>
                        <Route path="/">
                            <Products />
                        </Route>
                    </Switch>
                </PageWrapper>
            </UserContext.Provider>
        </Router>
    )
}

export default withAuthenticator(App)

const PageWrapper = styled.div`
  padding: 0px 80px;  
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
