const env = {
  server: { port: process.env.SERVER_PORT || 3001 },
  db: { url: process.env.DB_URL || 'mongodb://shammus:abc123@ds127841.mlab.com:27841/meat-api' }
};

//mongodb://shammus:abc123@ds127841.mlab.com:27841/meat-api
// 'mongodb://localhost/meat-api'

export default env;