interface Auth {
    slogId?: Number;
    slogNick?: String;
    desc?: String;
    providerData: {
        email: String;
        name: String;
        uid?: String;
    };
    profilePhoto?: String;
    createdAt: Number;
    updatedAt: Number;
};

export default Auth;