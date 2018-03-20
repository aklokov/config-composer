"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createComposer_1 = require("./createComposer/createComposer");
function compose(existing, config, context) {
    const composer = createComposer_1.createComposer(config);
    return composer.compose(existing, context);
}
exports.compose = compose;
//# sourceMappingURL=compose.js.map