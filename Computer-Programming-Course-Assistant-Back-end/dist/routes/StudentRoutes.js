"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.StudentRoutes = router;
// ! authenticate a student first
router.use(auth_1.authenticate);
router.route('/profile').get(controllers_1.GetProfile).patch(controllers_1.EditProfile);
//# sourceMappingURL=StudentRoutes.js.map