import { Request, Response, Router } from 'express';
import { Cat, CatType } from './cats.model';

const router: Router = Router();

// Read All -> GET
router.get('/cats', (req: Request, res: Response) => {
  try {
    const cats: CatType[] = Cat;
    res.status(200).send({
      success: true,
      data: {
        cats
      }
    });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message
      });
    }
  }
});

// Read one -> GET
router.get('/cats/:id', (req: Request, res: Response) => {
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
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message
      });
    }
  }
});

// Create -> POST
router.post('/cats', (req: Request, res: Response) => {
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
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message
      });
    }
  }
});

// Update -> PUT(전체 업데이트)

// Update -> PATCH(부분적으로 업데이트)
router.patch(('/cats/:id'), (req: Request, res: Response) => {
  try {
    res.status(200).send({
      success: true,
      data: {}
    });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).send({
        success: false,
        error: error.message
      });
    }
  }
});

export default router;