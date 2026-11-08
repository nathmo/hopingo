// Profiles saved in the browser (localStorage), several per device.
// Save codes move a profile to another device without any server.

import { newProfileData } from './engine/rewards.js';

const KEY = 'hopingo.v1';
// Earlier names of the app (Matou, then Mathou): their saves and codes still load.
const OLD_KEYS = ['mathou.v1', 'matou.v1'];
const CODE_PREFIX = 'HOPINGO1-';
const CODE_PREFIXES = [CODE_PREFIX, 'MATHOU1-', 'MATOU1-'];

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

// UTF-8 safe base64.
const toB64 = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str)));
const fromB64 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));

export function exportCode(profile) {
  return CODE_PREFIX + toB64(JSON.stringify(profile));
}

// Returns the imported profile. Replaces an existing one with the same id.
export function importCode(code) {
  const clean = code.trim().replace(/\s+/g, '');
  const prefix = CODE_PREFIXES.find((x) => clean.startsWith(x));
  if (!prefix) throw new Error('Ce n\'est pas un code de sauvegarde Hopingo.');
  let profile;
  try {
    profile = JSON.parse(fromB64(clean.slice(prefix.length)));
  } catch {
    throw new Error('Le code est incomplet ou abîmé.');
  }
  if (!profile.id || !profile.name || !profile.skills) throw new Error('Le code ne contient pas de profil.');
  state.profiles[profile.id] = { ...newProfileData(), ...profile };
  state.activeId = profile.id;
  save();
  return state.profiles[profile.id];
}
