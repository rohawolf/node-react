const environments = {
    development : {
        host: 'localhost',
        user: 'rohawolf',
        password: 'rohawolf',
        port: 3306,
        database: 'node_react',
    },
    test: {
        host: 'localhost',
        user: 'rohawolf',
        password: 'rohawolf',
        port: 3306,
        database: '',
    },
    production: {},
};

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];