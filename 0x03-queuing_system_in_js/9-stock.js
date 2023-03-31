import express from 'express';
import { createClient } from 'redis';
import { promisify } from 'util';

const app = express();
const port = 1245;
const client = createClient();

app.get('/list_products', (req, res) => {
  res.json(listProducts)
});

app.get('/list_products/:itemId', async (req, res) => {
  const item = getItemById(Number(req.params.itemId)); 
  if (item) {
    const stock = await getCurrentReservedStockById(req.params.itemId);
    item.currentQuantity = stock !== null ? stock : item.initialAvailableQuantity;
    res.json(item);
  }
  res.json({'status': 'Product not found'});
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const itemId = Number(req.params.itemId); 
  const item = getItemById(itemId);
  if (item === undefined) res.json({'status': 'Product not found'});
  let stock = await getCurrentReservedStockById(itemId);
  if (stock === null) stock = item.initialAvailableQuantity;
  if (stock >= 1) {
    reserveStockById(itemId, stock);
    res.json({"status":"Reservation confirmed","itemId": itemId});
  }
  res.json({"status":"Not enough stock available","itemId": itemId})
});

app.listen(port, () => {
  console.log(`Express app listening on port ${port}`)
})

const listProducts = [
  {"itemId":1, "itemName":"Suitcase 250", "price":50, "initialAvailableQuantity":4},
  {"itemId":2, "itemName":"Suitcase 450", "price":100, "initialAvailableQuantity":10},
  {"itemId":3, "itemName":"Suitcase 650", "price":350, "initialAvailableQuantity":2},
  {"itemId":4, "itemName":"Suitcase 1050", "price":550, "initialAvailableQuantity":5}
];

function getItemById(id) {
  const item = listProducts.find(element => element.itemId === id);
  return item;
}

function reserveStockById(itemId, stock) {
 client.set(itemId, stock - 1); 
};

async function getCurrentReservedStockById(itemId) {
  const getAsync = promisify(client.get).bind(client);
  const stock = await getAsync(itemId);
  return stock;
}
