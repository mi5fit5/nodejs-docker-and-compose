const {
  PORT,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PGDATA,
} = process.env;

module.exports = [
  {
    name: 'backend',
    script: 'dist/main.js',
    autorestart: true,
    env: {
      NODE_ENV: 'production',
      PORT: PORT || 3000,
      POSTGRES_HOST: POSTGRES_HOST,
      POSTGRES_PORT: POSTGRES_PORT,
      POSTGRES_USER: POSTGRES_USER,
      POSTGRES_PASSWORD: POSTGRES_PASSWORD,
      POSTGRES_DB: POSTGRES_DB,
      POSTGRES_PGDATA: POSTGRES_PGDATA,
      JWT_SECRET: JWT_SECRET,
    },
  },
];
