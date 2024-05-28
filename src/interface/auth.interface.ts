interface Auth {
    slogId: Number;
    providerData: {
        email: String;
        name: String;
        uid: String;
    };
    profilePhoto?: String;
    createdAt: Date;
    updatedAt: Date;
};

export default Auth;