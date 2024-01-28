"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.AdminRoutes = router;
router.route('/').get(controllers_1.GetInstructors).post(controllers_1.CreateInstructor);
router.route('/:id').get(controllers_1.GetInstructorById);
//# sourceMappingURL=AdminRoutes.js.map