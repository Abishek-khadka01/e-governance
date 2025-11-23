import { app } from './app.ts';
import AppLogger from './utils/logger.ts';
app.listen(3000, () => {
  AppLogger.info(`App is listening at port ${3000}`);
});
