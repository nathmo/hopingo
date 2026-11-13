// Profiles saved in the browser (localStorage), several per device.
// Save files move a profile to another device without any server.

import { newProfileData } from './engine/rewards.js';
import { t } from './i18n.js';

const KEY = 'hopingo.v1';
// Earlier names of the app (Matou, then Mathou): their saves and codes still load.
const OLD_KEYS = ['mathou.v1', 'matou.v1'];
// Prefixes of the old save codes (still read, no longer written).
const CODE_PREFIXES = ['HOPINGO1-', 'MATHOU1-', 'MATOU1-'];

export const AVATARS = ['🦊', '🐼', '🐸', '🐙', '🦉', '🐯', '🐨', '🦄', '🐢', '🐧', '🦁', '🐝'];

function read() {
  try {
    const raw = [KEY, ...OLD_KEYS].map((k) => localStorage.getItem(k)).find((v) => v != null);
    const data = JSON.parse(raw);
    if (data && data.profiles) return data;
  } catch { /* corrupted or missing */ }
  return { profiles: {}, activeId: null };
}

let state = read();

export function save() {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export const listProfiles = () => Object.values(state.profiles).sort((a, b) => a.createdAt - b.createdAt);
export const activeProfile = () => state.profiles[state.activeId] || null;

export function setActive(id) {
  state.activeId = id;
  save();
}

export function createProfile({ name, avatar, year, track }) {
  const id = `p${Date.now().toString(36)}${Math.floor(Math.random() * 1e4)}`;
  state.profiles[id] = { id, name, avatar, year, track, createdAt: Date.now(), ...newProfileData() };
  state.activeId = id;
  save();
  return state.profiles[id];
}

export function deleteProfile(id) {
  delete state.profiles[id];
  if (state.activeId === id) state.activeId = null;
  save();
}

// Save files. A profile leaves the device as a small JSON file (the
// download), never as a long text to copy: big profiles made the old codes
// (HOPINGO1-…, base64 of the same JSON) slow to show and to paste. Old codes,
// saved in a .txt file or pasted, still load.

const FILE_APP = 'hopingo';
const FILE_VERSION = 1;

// The text of the save file of a profile.
export function exportFile(profile) {
  return JSON.stringify({ app: FILE_APP, version: FILE_VERSION, savedAt: new Date().toISOString(), profile });
}

// A file name the student recognises: hopingo-Lea-2026-11-13.json.
export function exportFileName(profile) {
  const name = String(profile.name || 'profil').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w-]+/g, '_');
  return `hopingo-${name}-${new Date().toISOString().slice(0, 10)}.json`;
}

const fromB64 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));

// Reads a save file (JSON) or an old code; throws a message to show.
function parseSave(text) {
  const clean = String(text).trim();
  if (clean.startsWith('{')) {
    let data;
    try { data = JSON.parse(clean); } catch { throw new Error(t('Le fichier est incomplet ou abîmé.')); }
    if (data?.app !== FILE_APP || !data.profile) throw new Error(t('Ce n\'est pas une sauvegarde Hopingo.'));
    return data.profile;
  }
  const code = clean.replace(/\s+/g, '');
  const prefix = CODE_PREFIXES.find((x) => code.startsWith(x));
  if (!prefix) throw new Error(t('Ce n\'est pas une sauvegarde Hopingo.'));
  try {
    return JSON.parse(fromB64(code.slice(prefix.length)));
  } catch {
    throw new Error(t('Le code est incomplet ou abîmé.'));
  }
}

// Returns the imported profile. Replaces an existing one with the same id.
export function importSave(text) {
  const profile = parseSave(text);
  if (!profile?.id || !profile.name || !profile.skills) throw new Error(t('Le fichier ne contient pas de profil.'));
  state.profiles[profile.id] = { ...newProfileData(), ...profile };
  state.activeId = profile.id;
  save();
  return state.profiles[profile.id];
}
