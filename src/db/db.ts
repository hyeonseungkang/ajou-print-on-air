import { ClassicLevel } from 'classic-level';
import { join } from 'path';
import { QueueValueVo } from './vos/queue-value.vo';
import { rmSync } from 'fs';

const db = new ClassicLevel(join(process.env.PWD as string, 'db'));

export function setDB() {
  return console.log(`[DB] ${db.status}`);
}

export async function addTask(
  queueId: string,
  pageCount: number,
  name: string,
) {
  const queueValueVo = new QueueValueVo();
  queueValueVo.pageCount = pageCount;
  queueValueVo.docName = name;
  return db.put(queueId, JSON.stringify(queueValueVo));
}

export async function deleteTask(queueId: string) {
  try {
    rmSync(join(process.env.PWD as string, 'temp/', queueId + '.ps'));
  } catch {}
  try {
    rmSync(join(process.env.PWD as string, 'temp/', queueId + '.prn'));
  } catch {}
  try {
    rmSync(join(process.env.PWD as string, 'temp/', queueId + '.pdf'));
  } catch {}
  try {
    return db.del(queueId);
  } catch {}
}

export async function getTask(queueId: string) {
  const response = await db.get(queueId);
  const parsed: QueueValueVo = JSON.parse(response);
  return parsed;
}
