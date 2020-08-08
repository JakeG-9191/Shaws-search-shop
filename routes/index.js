import path from 'path';
import { router } from 'express';
import scrapeRoutes from './scrape';

// Scrape Routes
router.use('/scrape', scrapeRoutes);

router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
