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



// 404 Page not found
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('HTTP 404');
  res.send('404 Page not found');
});

// Port number
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});