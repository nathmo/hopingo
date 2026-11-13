// The problem bank: every template, by domain.
import meca from './meca.js';
import thermo from './thermo.js';
import elec from './elec.js';
import more from './more.js';

export const BANK = [...meca, ...thermo, ...elec, ...more];
