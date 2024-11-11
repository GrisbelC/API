require('dotenv').config();
const { Sequelize } = require('sequelize');

const isProduction = process.env.NODE_ENV === 'production';

const sequelize = new Sequelize(
    isProduction ? process.env.DATABASE_URL : process.env.DB_NAME,
    isProduction ? null : process.env.DB_USER,
    isProduction ? null : process.env.DB_PASSWORD,
    {
        host: isProduction ? null : process.env.DB_HOST,
        dialect: isProduction ? 'postgres' : 'mysql',
        protocol: isProduction ? 'postgres' : null,
        dialectOptions: isProduction
            ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false,
                },
            }
            : {},
    }
);

module.exports = sequelize;
