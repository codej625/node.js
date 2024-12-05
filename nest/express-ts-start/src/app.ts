import * as express from "express";
const app: express.Express = express();
const port: number = 8000;

app.get('/', (req: express.Request, res: express.Response) => {
  console.log(req.query);
  res.send({ 'name': 'codej625' });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})