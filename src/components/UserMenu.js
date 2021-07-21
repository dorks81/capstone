import React, {useContext} from 'react';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {UserContext} from "../App";
import styled from 'styled-components';
import Typography from "@material-ui/core/Typography";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {AmplifySignOut} from "@aws-amplify/ui-react";
import {Link} from "react-router-dom";

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = useContext(UserContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Wrapper>
            <UserButton onClick={handleClick}>
                <Typography variant={"body2"}>Hello, {user.username}</Typography>
                <Typography variant={"body1"} className="account">Your Account <ArrowDropDownIcon/> </Typography>
            </UserButton>

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to={"/profile"}>Profile</Link></MenuItem>
                <MenuItem onClick={handleClose}><AmplifySignOut /></MenuItem>
            </Menu>
        </Wrapper>
    );
}

export default UserMenu;

const Wrapper = styled.div`
    position: relative;
`;

const UserButton = styled.div`
    padding: 10px;
    &:hover {
      border: 1px solid #555;
      cursor: pointer;
    }
    
    .account {
      display: flex;
      align-items: center;
    }
`;
