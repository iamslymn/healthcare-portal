"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const database_1 = __importDefault(require("./config/database"));
const logger_1 = require("./utils/logger");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3001',
        methods: ['GET', 'POST']
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.default)();
app.use('/api/auth', auth_routes_1.default);
io.on('connection', (socket) => {
    logger_1.logger.info('A user connected');
    socket.on('disconnect', () => {
        logger_1.logger.info('User disconnected');
    });
});
app.use((err, _req, res, _next) => {
    logger_1.logger.error(err.stack);
    res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 5004;
httpServer.listen(PORT, () => {
    logger_1.logger.info(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map