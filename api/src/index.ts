const express = require('express');
const resultRoutes = require('./resultRoutes');

const app = express();

app.use((req:any, res:any, next:any) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Adjust to your frontend URL
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());

app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
