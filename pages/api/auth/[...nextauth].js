import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import validator from "validator";

import User from "../../../models/user";
import dbConnect from "../../../config/dbConnect";

export default NextAuth({
    session: {
        jwt: true,
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                dbConnect();
                const { email, password } = credentials;

                // check if email and password is entered
                if (!email || !password || !validator.isEmail(email) || password.length < 8) {
                    throw new Error("Please enter valid email and password");
                }

                // fetch user with entered email in the database including password
                // select with + is overwrite schema select: false to select: true
                // + means fetch password along with the result
                const user = await User.findOne({ email }).select("+password");

                // check user exists & compare password
                if (!user || !(await user.comparePassword(password))) {
                    throw new Error("Email or password is incorrect!");
                }

                // return promise
                return Promise.resolve(user);
            },
        }),
    ],
    callbacks: {
        // jwt callback
        jwt: async (token, user) => {
            user && (token.user = user);
            return Promise.resolve(token);
        },

        // session callback
        session: async (session, token) => {
            session.user = token.user;
            return Promise.resolve(session);
        },
    },
});
