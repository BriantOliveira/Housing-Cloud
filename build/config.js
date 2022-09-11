"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const configuration = () => {
    var _a, _b, _c, _d;
    const defaultConfiguration = {
        port: (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000,
        nodeEnv: process.env.NODE_ENV,
        typeorm: {
            host: process.env.TYPEORM_HOST,
            port: Number(process.env.TYPEORM_PORT),
            user: process.env.TYPEORM_USER,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
        },
    };
    const developmentConfiguration = {
        port: (_b = Number(process.env.PORT)) !== null && _b !== void 0 ? _b : 3000,
        nodeEnv: process.env.NODE_ENV,
        typeorm: {
            host: process.env.DEVELOPMENT_TYPEORM_HOST,
            port: Number(process.env.DEVELOPMENT_TYPEORM_PORT),
            user: process.env.DEVELOPMENT_TYPEORM_USER,
            password: process.env.DEVELOPMENT_TYPEORM_PASSWORD,
            database: process.env.DEVELOPMENT_TYPEORM_DATABASE,
        },
    };
    const stagingConfiguration = {
        port: (_c = Number(process.env.PORT)) !== null && _c !== void 0 ? _c : 3000,
        nodeEnv: process.env.NODE_ENV,
        typeorm: {
            host: process.env.STAGING_TYPEORM_HOST,
            port: Number(process.env.STAGING_TYPEORM_PORT),
            user: process.env.STAGING_TYPEORM_USER,
            password: process.env.STAGING_TYPEORM_PASSWORD,
            database: process.env.STAGING_TYPEORM_DATABASE,
        },
    };
    const productionConfiguration = {
        port: (_d = Number(process.env.PORT)) !== null && _d !== void 0 ? _d : 3000,
        nodeEnv: process.env.NODE_ENV,
        typeorm: {
            host: process.env.PRODUCTION_TYPEORM_HOST,
            port: Number(process.env.PRODUCTION_TYPEORM_PORT),
            user: process.env.PRODUCTION_TYPEORM_USER,
            password: process.env.PRODUCTION_TYPEORM_PASSWORD,
            database: process.env.PRODUCTION_TYPEORM_DATABASE,
        },
    };
    if (process.env.NODE_ENV === "development") {
        return developmentConfiguration;
    }
    if (process.env.NODE_ENV === "staging") {
        return stagingConfiguration;
    }
    if (process.env.NODE_ENV === "production") {
        return productionConfiguration;
    }
    return defaultConfiguration;
};
exports.configuration = configuration;
//# sourceMappingURL=config.js.map