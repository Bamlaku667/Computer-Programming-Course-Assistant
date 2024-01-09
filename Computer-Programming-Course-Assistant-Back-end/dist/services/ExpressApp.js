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
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const routes_1 = require("../routes");
const cors_1 = __importDefault(require("cors"));
const AdminRoutes_1 = require("../routes/AdminRoutes");
const middlewares_1 = require("../middlewares");
const fs_1 = __importDefault(require("fs"));
const App = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get('/', (req, res) => {
        res.send('course-assisstant-api-works!');
    });
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Use /tmp directory for temporary image storage
    const imagesPath = '/tmp/images';
    if (!fs_1.default.existsSync(imagesPath)) {
        fs_1.default.mkdirSync(imagesPath);
    }
    app.use('/images', express_1.default.static(imagesPath));
    app.use('/api/v1/auth', routes_1.AuthRoutes);
    app.use('/api/v1/student', routes_1.StudentRoutes);
    app.use('/api/v1/admin', AdminRoutes_1.AdminRoutes);
    app.use('/api/v1/instructor', routes_1.InstructorRoutes);
    app.use(middlewares_1.errorHandler);
    return app;
});
exports.default = App;
//# sourceMappingURL=ExpressApp.js.map