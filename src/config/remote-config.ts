import axios from 'axios';

class RemoteConfig {
  constructor() {
    fetchCost().then((r) => (this.costPerPage = r));
  }

  costPerPage = 50;
}

async function fetchCost(): Promise<number> {
  const response = await axios.post(
    'http://u-printon.canon-bs.co.kr:62300/sis/costs/',
    JSON.stringify({ franchise: '28' }),
    {
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.data) {
    return 50;
  }
  const parsed: any = response.data;
  const costList: { size: string; color: string; cost: string }[] =
    parsed.print;
  const cost = costList.find((v) => v.size === 'A4' && v.color === '0');
  if (!cost) return 50;
  return parseInt(cost.cost, 10);
}

export const remoteConfig = new RemoteConfig();
