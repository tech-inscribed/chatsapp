import React, { useState, useRef } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    Button,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IState } from '../../reducers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

export const Home: React.FC = props => {
    const classes = useStyles();

    const [menuOpen, setMenuOpen] = useState(false);
    const menuAnchor = useRef(null);

    const name: string = useSelector<IState>(
        state => state.auth.userDetails?.attributes.name || '',
    ) as string;

    return (
        <AppBar>
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5">ChatsApp</Typography>
                <Button
                    onClick={() => setMenuOpen(true)}
                    buttonRef={menuAnchor}
                    color="inherit"
                >
                    {name}
                </Button>
                <Menu
                    open={menuOpen}
                    anchorEl={menuAnchor.current}
                    onClose={() => setMenuOpen(false)}
                >
                    <MenuItem component={Link} to="/sign-out">
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
