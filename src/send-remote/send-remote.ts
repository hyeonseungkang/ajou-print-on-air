import { deleteTask, getTask } from '../db/db';
import { readFileSync } from 'fs';
import { join } from 'path';
import { addressConfig, Config } from '../config/config';
import { QueueValueVo } from '../db/vos/queue-value.vo';
import axios from 'axios';

export async function sendRemote(queueId: string) {
  const queue = await getTask(queueId);
  await registerDoc(queueId, queue);
  await sendPrnFile(queueId);
  await console.log(`[SEND_REMOTE] ${queueId} registered.`);
  await deleteTask(queueId);
}

function registerDoc(queueId: string, queue: QueueValueVo) {
  const body = {
    nonmember_id: Config.nickname,
    franchise: '28',
    pc_mac: addressConfig.macAddress,
    docs: [
      {
        doc_name: queue.docName,
        queue_id: queueId,
        pc_id: addressConfig.ipAddress,
        pages: [
          {
            size: 'A4',
            color: 0,
            cnt: queue.pageCount,
          },
        ],
      },
    ],
  };
  return axios.post(
    'http://u-printon.canon-bs.co.kr:62301/nologin/regist_doc/',
    JSON.stringify(body),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

async function sendPrnFile(queueId: string) {
  const raw = await readFileSync(
    join(process.env.PWD as string, 'temp/', queueId + '.prn'),
  );
  await axios.post(
    'http://218.145.52.6:8080/spbs/upload_bin',
    Buffer.from(raw),
    {
      headers: {
        'Content-Type': 'application/X-binary',
        'Content-Disposition': `attachment;filename=${queueId}.prn`,
      },
    },
  );
}
