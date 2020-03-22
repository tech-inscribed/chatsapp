export interface IUserDetails {
    username: string;
    signInUserSession: {
        idToken: {
            jwtToken: string;
        };
        refreshToken: {
            token: string;
        };
        accessToken: {
            jwtToken: string;
        };
    };
    attributes: {
        sub: string;
        email_verified: boolean;
        name: string;
        email: string;
    };
    preferredMFA: string;
}
