"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const todos_1 = __importDefault(require("./routes/todos"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use("/api/todos", todos_1.default);
app.use((err, _req, res, _next) => {
    res.status(500).json({ message: err.message });
});
mongoose_1.default
    .connect("mongodb+srv://admin:iziuOrCmnGavldZ0@htetlinmaungcluster-vtpxr.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
})
    .catch((err) => console.log(err.message));
