import React from 'react';
import {
    TextField,
    Paper,
    makeStyles,
    Button,
    Typography,
    CircularProgress,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { signUp } from '../../actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { validatePassword, validateEmail, validateName } from './validators';
import { Link, Redirect } from 'react-router-dom';
import { IState } from '../../reducers';
import { Status } from '../../models/status';

interface IFormData {
    name: string;
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

export const SignUp: React.FC = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const status = useSelector<IState>(state => state.auth.signUp.status);

    const { handleSubmit, register, errors } = useForm<IFormData>();

    const handleSignUp = (values: IFormData) => {
        dispatch(signUp(values.name, values.email, values.password));
    };

    switch (status) {
        case Status.LOADING:
            return (
                <>
                    <CircularProgress />
                    <Typography variant="caption">
                        Creating your account
                    </Typography>
                </>
            );

        case Status.SUCCESS:
            return <Redirect to="/confirm" />;

        case Status.UNINITIALIZED:
        case Status.FAILURE:
        default:
            return (
                <Paper className={classes.root}>
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <Typography variant="h4" align="center">
                            Create an account
                        </Typography>
                        <Typography
                            variant="overline"
                            color="primary"
                            align="center"
                            component={Link}
                            to="/sign-in"
                            style={{ display: 'block' }}
                        >
                            Already a member? Sign In
                        </Typography>
                        <div className={classes.fields}>
                            <TextField
                                variant="outlined"
                                label="Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputRef={register({
                                    validate: validateName,
                                })}
                                name="name"
                                error={!!errors.name}
                                helperText={
                                    (errors.name && errors.name.message) || ''
                                }
                                fullWidth
                                autoFocus
                            />
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
                                    (errors.password &&
                                        errors.password.message) ||
                                    ''
                                }
                                fullWidth
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Sign Up
                        </Button>
                    </form>
                </Paper>
            );
    }

    return null;
};
