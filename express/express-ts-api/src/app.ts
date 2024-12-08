import * as express from 'express';
import { Cat, CatType } from './app.model';

const app: express.Express = express();
const port: number = 8000;

// Apply the middleware globally
app.use(express.json());

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // Logs the request headers
  console.log('Request logging -> ', req.rawHeaders);
  next();
});

// 전체 조회(Read All)
app.get('/cats', (req: express.Request, res: express.Response) => {
  try {
    const cats: CatType[] = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats
      }
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

// 특정 아이디 조회(Read one)
app.get('/cats/:id', (req: express.Request, res: express.Response) => {
  try {
    const id: string = req.params.id;
    const cats: CatType | undefined = Cat.find(cat => cat.id === parseInt(id));
    // 아이디 값이 없을 시
    if (!cats) throw new Error('Not found cat');

    res.status(200).send({
      success: true,
      data: {
        cats
      }
    });
  }
  catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
});

// Create
app.post('/cats', (req: express.Request, res: express.Response) => {
  try {
    const data: CatType | any = req.body;

    const hasFalsyValue: (string | number)[] = Object.values(data);
    // 입력값이 부족 시
    hasFalsyValue.forEach(value => {
      if (!value) throw new Error('Insufficient input');
    });

    const cats: CatType[] = Cat;
    // filter가 작동 후 메서드 체인으로 map이 작동
    let maxId: number = Math.max(...cats.filter(cat => cat.id !== undefined).map(cat => cat.id!));
    data['id'] = ++maxId;
    Cat.push(data);

    res.status(200).send({
      success: true,
      data: { data }
    });
  }
  catch (error: any) {
    res.status(400).send({
      success: false,
      error: error.message
    });
  }
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