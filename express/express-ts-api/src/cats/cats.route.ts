import { Router } from 'express';
import * as CatService from './cats.service';

const router: Router = Router();

// Read all -> GET
router.get('/cats', CatService.readAllCats);
// Read one -> GET
router.get('/cats/:id', CatService.readOneCat);
// Create -> POST
router.post('/cats', CatService.createCat);
// Update all -> PUT
router.put(('/cats/:id'), CatService.updateAllCats);
// Update one -> PATCH
router.patch(('/cats/:id'), CatService.updateOneCat);
// Delete one -> DELETE
router.delete(('/cats/:id'), CatService.deleteOneCat);

export default router;