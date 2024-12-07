import * as express from 'express';
import { Cat } from './app.model';
import { error } from 'console';
const app: express.Express = express();
const port: number = 8000;

// 전체에 미들웨어 적용
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('logging test -> ', req.rawHeaders[3]);
  next();
});

// 특정 path에 미들웨어 적용
app.get('/cats/som', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('som');
  next();
});

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({ cats: Cat });
})

app.get('/cats', (req: express.Request, res: express.Response) => {
  res.send({ Cat });
})

app.get('/cats/blue', (req: express.Request, res: express.Response) => {
  res.send({ blue: Cat[0] });
})

app.get('/cats/som', (req: express.Request, res: express.Response) => {
  res.send({ som: Cat[1] });
})

// 없는 페이지 404처리
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log('404');
  res.send({ 'error': '404 not found error' })
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})