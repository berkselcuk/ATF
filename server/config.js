require('dotenv').config();
const IP = process.env.IP;

const PORT = process.env.PORT;
const MYSQL_ADDRESS = process.env.MYSQL_ADDRESS;
const MYSQL_USERNAME = process.env.MYSQL_USERNAME;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE;
const SECRET_KEY = process.env.SECRET_KEY;
const DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
module.exports = {
    IP,
    PORT,
    MYSQL_ADDRESS,
    MYSQL_USERNAME,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    SECRET_KEY,
    DEFAULT_USER_PASSWORD,
    CORS_ORIGIN
}