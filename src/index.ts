import fs from 'fs';
import { join } from 'path';
import { createUfrIppServer } from './ipp-server/ufr-ipp-server/create-ufr-ipp-server';
import { createPsIppServer } from './ipp-server/ps-ipp-server/create-ps-ipp-server';
import { setDB } from './db/db';
import { Config } from './config/config';

fs.mkdirSync(join(process.env.PWD as string, 'temp/'), { recursive: true });
fs.mkdirSync(join(process.env.PWD as string, 'db/'), { recursive: true });

setDB();
createPsIppServer();
createUfrIppServer();
console.log(`[APP] launched. nickname=${Config.nickname}`);
