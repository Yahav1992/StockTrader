const express = require ('express');
require('./db/mongoose');
const stockRouter = require('./routers/stocks');
const stockHistoryRouter= require('./routers/stockHistory');
const updateStockHistoryRouter= require('./routers/updateStockHistory');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(stockRouter);
app.use(stockHistoryRouter);
app.use(updateStockHistoryRouter);

app.listen(port , ()=>{
    console.log('server is up on port: '+ port);
});
