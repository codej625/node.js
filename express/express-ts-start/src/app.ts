import * as express from 'express';
import { Cat } from './app.model';

const app: express.Express = express();
const port: number = 8000;

// Apply the middleware globally
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Logs the request headers
  console.log('Request logging -> ', req.rawHeaders);
  next();
});


// Example Apply middleware to a specific path
app.get('/cats/som', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('first');
  next();
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
});

app.get('/cats', (req: express.Request, res: express.Response) => {
  res.send({ Cat });
});

app.get('/cats/blue', (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
});

app.get('/cats/som', (req: express.Request, res: express.Response) => {
  console.log('second');
  res.send({ som: Cat[1] });
});


// 404 Page not found
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('HTTP 404');
  res.send('404 Page not found');
});

// Port number
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});