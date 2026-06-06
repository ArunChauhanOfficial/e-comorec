import  "dotenv/config";

import app from './src/app.js';




const PORT = process.env.PORT || 7400;





app.listen(PORT , () => {
    console.log(`server is  running http://localhost:${PORT}`)
})