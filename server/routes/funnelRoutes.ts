import express from 'express';
import {
  createOrUpdateUserFunnel,
  uploadImages,
  handleImageUpload,
  getUserFunnelData
} from '../controllers/funnelController';

const router = express.Router();

router.post('/funnel', createOrUpdateUserFunnel);
router.post('/funnel/images', uploadImages, handleImageUpload);
router.get('/funnel/:phoneNumber', getUserFunnelData);

export default router;