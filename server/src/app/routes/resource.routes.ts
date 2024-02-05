import express from 'express';
import * as resourceController from '../controllers/resource.controller';

const router = express.Router();

router.post('/', resourceController.createResource);
router.get('/', resourceController.getAllResources);
router.put('/:id/status', resourceController.updateResourceStatus);
router.delete('/:id', resourceController.deleteResource);
router.get('/:id', resourceController.getResourceById);
router.get('/author/:authorId', resourceController.getResourcesByAuthorId);

export default router;