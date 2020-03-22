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
import { useDispatch, useSelector } from 'react-redux';
import { validateCode } from './validators';
import { Link, Redirect } from 'react-router-dom';
import { IState } from '../../reducers';
import { Status } from '../../models/status';
import { confirm } from '../../actions/authActions';

interface IFormData {
    code: string;
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

export const Confirm: React.FC = props => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const status = useSelector<IState>(state => state.auth.confirm.status);
    const destination = useSelector<IState>(
        state => state.auth.confirm.destination,
    );

    const { handleSubmit, register, errors } = useForm<IFormData>();

    const onVerify = (values: IFormData) => {
        dispatch(confirm(values.code));
    };

    if (status === Status.LOADING) {
        return (
            <>
                <CircularProgress />
                <Typography variant="caption">
                    Confirming your account
                </Typography>
            </>
        );
    }

    if (status === Status.SUCCESS) {
        return <Redirect to="/sign-in" />;
    }

    return (
        <Paper className={classes.root}>
            <form onSubmit={handleSubmit(onVerify)}>
                <Typography variant="h4" align="center">
                    Confirm your account
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
                    <Typography variant="body1">
                        We have sent a verification code to {destination}
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Verification Code"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputRef={register({
                            validate: validateCode,
                        })}
                        name="code"
                        error={!!errors.code}
                        helperText={(errors.code && errors.code.message) || ''}
                        fullWidth
                    />
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                >
                    Confirm
                </Button>
            </form>
        </Paper>
    );
};
