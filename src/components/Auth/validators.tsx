export const validateName = (name: string) => {
    if (name.length === 0) {
        return 'Name is required';
    }

    return true;
};

export const validateEmail = (email: string) => {
    if (email.length === 0) {
        return 'Email is required';
    }

    return true;
};

export const validatePassword = (password: string) => {
    if (password.length === 0) {
        return 'Password is required';
    }

    if (password.length < 8) {
        return 'Password must be atleast 8 characters long';
    }

    if (password === password.toLowerCase()) {
        return 'Password must contain atleast one uppercase letter';
    }

    if (password === password.toUpperCase()) {
        return 'Password must contain atleast one lowercase letter';
    }

    return true;
};

export const validateCode = (code: string) => {
    if (code.length === 0) {
        return 'Verification code is required';
    }

    if (code.length !== 6) {
        return 'Invalid verification code';
    }

    return true;
};
