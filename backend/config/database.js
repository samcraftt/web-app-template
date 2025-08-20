const { Pool } = require('pg');
require('dotenv').config();

const isDeployed = process.env.ENVIRONMENT === 'production' || process.env.ENVIRONMENT === 'staging';
const pool = new Pool({
	connectionString: process.env.PG_URL,
	// Only use SSL in deployed environments, when PG_URL is a connection string to a remote postgres instance
	// When connecting to a local postgres instance, don't use SSL
	...(isDeployed ? { ssl: { rejectUnauthorized: false } } : {})
});

module.exports = {
  query: (text, params) => pool.query(text, params)
};
