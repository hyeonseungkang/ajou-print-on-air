import { CupsUFRPrinterName, PSPrinterName } from '../../config/config';
import { v4 as uuidV4 } from 'uuid';
import { readFileSync, createWriteStream } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';
import { addTask } from '../../db/db';
import { printDirect } from '@grandchef/node-printer';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Printer = require('ipp-printer');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfPageCounter = require('pdf-page-counter');

export function createPsIppServer() {
  const PsIppServer = new Printer(PSPrinterName);
  console.log('[PS_IPP] PS IPP server started.');
  console.log(PSPrinterName, PsIppServer.server.address());

  PsIppServer.on('job', (job: any) => {
    const queueId = uuidV4();
    const filename = join(process.env.PWD as string, 'temp/', queueId + '.ps');
    const file = createWriteStream(filename);

    job.on('end', () => {
      console.log(`[PS_IPP] ${queueId}.ps`);
      convertPsToPdf(queueId, job.name);
    });

    job.pipe(file);
  });
}

function convertPsToPdf(queueId: string, docName: string) {
  const psPath = join(process.env.PWD as string, 'temp/', queueId + '.ps');
  const pdfPath = join(process.env.PWD as string, 'temp/', queueId + '.pdf');
  new Promise((resolve) => {
    resolve(
      execSync('ps2pdf ' + psPath + ' ' + pdfPath + ' && echo finish').length,
    );
  }).then(() => {
    console.log(`[PS2PDF] ${queueId}.pdf`);
    pdfPageCounter(readFileSync(pdfPath)).then(async (r: any) => {
      await addTask(queueId, r.numpages, docName);
      printDirect({
        data: Buffer.from(readFileSync(psPath).buffer),
        printer: CupsUFRPrinterName,
        type: 'POSTSCRIPT',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        docname: queueId,
        options: {
          CNDuplex: 'None',
        },
        error: (err) => console.error(err),
        success: () => null,
      });
    });
  });
}
