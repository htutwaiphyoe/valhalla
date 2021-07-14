module.exports = {
    webpack: (config) => {
        config.node = {
            fs: "empty",
        };
        return config;
    },
    env: {
        NEXTAUTH_URL: "http://localhost:3000/api/auth",
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};
