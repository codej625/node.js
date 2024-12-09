import { Request, Response } from 'express';
import { Cats, CatType } from './cats.model';

// Read all -> GET
export const readAllCats = (req: Request, res: Response): void => {
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
};

// Read one -> GET
export const readOneCat = (req: Request, res: Response): void => {
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
};

// Create -> POST
export const createCat = (req: Request, res: Response): void => {
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
};

// Update all -> PUT(전체 업데이트)
export const updateAllCats = (req: Request, res: Response): void => {
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
};

// Update one -> PATCH(부분적으로 업데이트)
export const updateOneCat = (req: Request, res: Response): void => {
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
};

// Delete one -> DELETE
export const deleteOneCat = (req: Request, res: Response): void => {
  try {
    const id: number = parseInt(req.params.id);
    // Return value
    let result: CatType[] | undefined;
    let err: boolean = false;

    Cats.forEach((cat, index) => {
      if (cat.id === id) {
        Cats.splice(index, 1);
        err = true;
      }
    });

    result = Cats;

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
};