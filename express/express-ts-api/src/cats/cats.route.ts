import { Request, Response, Router } from 'express';
import { Cats, CatType } from './cats.model';

const router: Router = Router();

// Read all -> GET
router.get('/cats', (req: Request, res: Response) => {
  try {
    const cats: CatType[] = Cats;
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
    const cats: CatType | undefined = Cats.find(cat => cat.id === parseInt(id));
    // 아이디 값이 없을 시
    if (!cats) throw new Error('Cat not found');

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

    const cats: CatType[] = Cats;
    // filter가 작동 후 메서드 체인으로 map이 작동
    let maxId: number = Math.max(...cats.filter(cat => cat.id !== undefined).map(cat => cat.id!));
    data['id'] = ++maxId;
    Cats.push(data);

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

// Update all -> PUT(전체 업데이트)
router.put(('/cats/:id'), (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const body: CatType = req.body;
    // Return value
    let result: CatType | undefined;
    let err: boolean = false;

    Cats.forEach((cat, index) => {
      if (cat.id === id) {
        body.id = id;
        Cats[index] = body;
        result = Cats[index];
        err = true;
      }
    });

    if (!err) throw new Error('Cat not found');

    res.status(200).send({
      success: true,
      data: { result }
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

// Update one -> PATCH(부분적으로 업데이트)
router.patch(('/cats/:id'), (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id);
    const body: CatType = req.body;
    // Return value
    let result: CatType | undefined;
    let err: boolean = false;

    Cats.forEach((cat, index) => {
      if (cat.id === id) {
        const patchData: CatType = Cats[index];
        Cats[index] = { ...patchData, ...body };
        result = Cats[index];
        err = true;
      }
    });

    if (!err) throw new Error('Cat not found');

    res.status(200).send({
      success: true,
      data: { result }
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