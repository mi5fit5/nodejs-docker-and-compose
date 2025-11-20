export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.POSTGRES_HOST || 'postgres',
    port: parseInt(process.env.POSTGRES_HOST, 10) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD || 'student',
    database: process.env.POSTGRES_DB || 'kupipodariday',
  },
  JWT_SECRET: process.env.JWT_SECRET || 'some-secret-key',
});
