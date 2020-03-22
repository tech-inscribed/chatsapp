import React from 'react';
import {
    TextField,
    Paper,
    makeStyles,
    Button,
    FormControlLabel,
    Checkbox,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { signIn } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { validatePassword, validateEmail } from './validators';
import { Link, Redirect } from 'react-router-dom';
import { IState } from '../../reducers';
import { Status } from '../../models/status';

interface IFormData {
    email: string;
    password: string;
}

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        width: 400,
    },
    fields: {
        display: 'grid',
        gridGap: theme.spacing(7),
        margin: `${theme.spacing(4)}px 0`,
    },
}));

export const SignIn: React.FC = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const status = useSelector<IState>(state => state.auth.signIn.status);

    const { handleSubmit, register, errors } = useForm<IFormData>();

    const onSignIn = (values: IFormData) => {
        dispatch(signIn(values.email, values.password));
    };

    if (status === Status.LOADING) {
        return (
            <>
                <CircularProgress />
                <Typography variant="caption">Signing in</Typography>
            </>
        );
    }

    if (status === Status.SUCCESS) {
        return <Redirect to="/" />;
    }

    return (
        <Paper className={classes.root}>
            <form onSubmit={handleSubmit(onSignIn)}>
                <Typography variant="h4" align="center">
                    Sign in to your account
                </Typography>
                <Typography
                    variant="overline"
                    color="primary"
                    align="center"
                    component={Link}
                    to="/sign-up"
                    style={{ display: 'block' }}
                >
                    Not a member? Create an account
                </Typography>
                <div className={classes.fields}>
                    <TextField
                        variant="outlined"
                        label="Email Address"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef={register({
                            validate: validateEmail,
                        })}
                        name="email"
                        error={!!errors.email}
                        helperText={
                            (errors.email && errors.email.message) || ''
                        }
                        fullWidth
                    />
                    <TextField
                        variant="outlined"
                        label="Password"
                        type="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef={register({
                            validate: validatePassword,
                        })}
                        name="password"
                        error={!!errors.password}
                        helperText={
                            (errors.password && errors.password.message) || ''
                        }
                        fullWidth
                    />
                </div>
                <FormControlLabel control={<Checkbox />} label="Remember Me" />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Sign In
                </Button>
            </form>
        </Paper>
    );
};
