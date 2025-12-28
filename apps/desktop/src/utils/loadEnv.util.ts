// import utils
import { config } from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';

export const loadEnvUtil = (appPath: string): void => {
  const envPath = join(appPath, '.env');
  if (existsSync(envPath)) {
    config({ path: envPath });
  }
};

export default loadEnvUtil;
