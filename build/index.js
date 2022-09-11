"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDB = void 0;
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const createTypeormConnection_1 = require("./utils/createTypeormConnection");
const logger_1 = __importDefault(require("./utils/logger"));
const config = (0, config_1.configuration)();
const app = app_1.default;
// eslint-disable-next-line consistent-return
const startDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, createTypeormConnection_1.createDBConnection)();
        logger_1.default.info(`Connected to ${config.nodeEnv} Database.`);
        const server = app.listen(config.port, () => {
            logger_1.default.info(`Housing Cloud listening on port ${config.port} `);
        });
        return server;
    }
    catch (err) {
        logger_1.default.error(`Failed to connect to ${config.nodeEnv} Database: ${err}`);
        process.exit(1);
    }
});
exports.startDB = startDB;
(0, exports.startDB)();
//# sourceMappingURL=index.js.map