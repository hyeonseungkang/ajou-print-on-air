import { load } from 'js-yaml';
import { join } from 'path';
import { readFileSync } from 'fs';
import { EnvVariablesInterface } from './types/env-variables.interface';

const getRaw = (filename: string) =>
  readFileSync(join(process.env.PWD as string, filename)).toString();

export const Config = (
  process.env.NODE_ENV === 'development'
    ? load(getRaw('dev.env.yml'))
    : load(getRaw('env.yml'))
) as EnvVariablesInterface;

class AddressConfig {
  ipAddress =
    '192.168.' +
    (Math.floor(Math.random() * 255) + 1).toString(10) +
    '.' +
    (Math.floor(Math.random() * 255) + 1).toString(10);
  macAddress = 'XXXXXXXXXXXX'.replace(/X/g, () => {
    return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
  });
}

export const addressConfig = new AddressConfig();

export const UFRPrinterName = 'Ajou Print-on-Air UFR';
export const PSPrinterName = 'Ajou Print-on-Air PS';
export const CupsUFRPrinterName = 'Ajou_Print_on_Air_UFR';
export const CupsPSPrinterName = 'Ajou_Print_on_Air_PS';
