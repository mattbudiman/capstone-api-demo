require('dotenv').config();  // Load environment variables from .env
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    
    process.exit(1);
  });
