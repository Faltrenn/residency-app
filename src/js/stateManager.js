import { fetchUser } from "./utils.js";

class KeyObject {
  constructor(stateKey, objKey) {
    this.stateKey = stateKey;
    this.objKey = objKey;
  }
}

export const KEYS = Object.freeze({
  USER: new KeyObject("userId", "id"),
  ROLE: new KeyObject("role", "title"),
});

export const stateManager = {
  refreshState: refresh,
  userId: {
    set: (id) => localStorage.setItem(KEYS.USER.stateKey, id),
    get: async () => await fetchUser(localStorage.getItem(KEYS.USER.stateKey)),
    clear: () => localStorage.removeItem(KEYS.USER.stateKey),
  },
  role: {
    set: (role) => localStorage.setItem(KEYS.ROLE.stateKey, role),
    get: () => localStorage.getItem(KEYS.ROLE.stateKey),
    clear: () => localStorage.removeItem(KEYS.ROLE.stateKey),
  },
};

/**
 * Refresh a passed obj state to new value or get saved value
 *
 * @param {KeyObject} keyInfo - Values to manipulate correct state.
 * @param {Object} obj - Object that contains or not new values.
 * @returns {Object} Return saved object or the object passad if not null.
 */
function refresh(keyInfo, obj) {
  if (obj) stateManager[keyInfo.stateKey].set(obj[keyInfo.objKey]);
  return stateManager[keyInfo.stateKey].get();
}
