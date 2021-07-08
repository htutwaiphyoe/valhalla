module.exports = {
    webpack: (config) => {
        config.node = {
            fs: "empty",
        };
        return config;
    },
    env: {
        DB_CONNECTION_STRING_PROD:
            "mongodb+srv://valhalla:valhallanextjs@cluster0.je3fi.mongodb.net/hotel?retryWrites=true&w=majority",
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};
