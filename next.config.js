module.exports = {
    webpack: (config) => {
        config.node = {
            fs: "empty",
        };
        return config;
    },
    env: {
        DB_CONNECTION_STRING: "mongodb://localhost:27017/valhalla",
    },
    images: {
        domains: ["res.cloudinary.com"],
    },
};
