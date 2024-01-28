"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});
exports.Module = (0, mongoose_1.model)('Module', moduleSchema);
//# sourceMappingURL=Module.js.map