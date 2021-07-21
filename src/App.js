import './App.css';
import React from "react";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
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
                <div>
                    <h3>
                        Welcome, <Link to="/profile">{user.username}</Link>
                    </h3>
                    <Switch>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="/products/:id">
                            <EditProduct />
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
                    <AmplifySignOut />
                </div>
            </UserContext.Provider>
        </Router>
    )
}

export default withAuthenticator(App)
