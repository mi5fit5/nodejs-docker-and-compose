"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT) || 3001,
    database: {
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        username: process.env.DATABASE_USER || 'student',
        password: process.env.DATABASE_PASSWORD || 'student',
        database: process.env.DATABASE_NAME || 'kupipodariday',
    },
    JWT_SECRET: process.env.JWT_SECRET || 'some-secret-key',
});
//# sourceMappingURL=config.js.map