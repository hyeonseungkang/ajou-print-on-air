import { createWriteStream, existsSync } from 'fs';
import { UFRPrinterName } from '../../config/config';
import { join } from 'path';
import { sendRemote } from '../../send-remote/send-remote';
import { deleteTask } from '../../db/db';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Printer = require('ipp-printer');

export function createUfrIppServer() {
  const UFRIPPServer = new Printer(UFRPrinterName);
  console.log('[URF_IPP] URF IPP server started.');
  console.log(UFRPrinterName, UFRIPPServer.server.address());

  UFRIPPServer.on('job', (job: any) => {
    const queueId = (job.name as string).split(' - ')[1].trim();
    const psFilename = join(
      process.env.PWD as string,
      'temp/',
      queueId + '.ps',
    );

    const filename = join(process.env.PWD as string, 'temp/', queueId + '.prn');
    const file = createWriteStream(filename);

    job.on('end', () => {
      if (!existsSync(psFilename)) {
        console.log('[URF_IPP] No PS file. Dismiss print request.');
        deleteTask(queueId);
      } else {
        console.log(`[URF_IPP] ${queueId}.prn`);
        sendRemote(queueId);
      }
    });

    job.pipe(file);
  });
}
