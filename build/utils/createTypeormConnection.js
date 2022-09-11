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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDBConnection = void 0;
const typeorm_1 = require("typeorm");
const config_1 = require("../config");
const config = (0, config_1.configuration)();
const createDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const connectionOptions = yield (0, typeorm_1.getConnectionOptions)(config.nodeEnv);
    const connection = yield (0, typeorm_1.createConnection)(Object.assign(Object.assign({}, connectionOptions), { name: "default" }));
    return connection;
});
exports.createDBConnection = createDBConnection;
//# sourceMappingURL=createTypeormConnection.js.map