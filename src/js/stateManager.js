import { fetchRole, fetchUser } from "./utils.js";

class KeyObject {
  constructor(stateKey, objKey) {
    this.stateKey = stateKey;
    this.objKey = objKey;
  }
}

export const KEYS = Object.freeze({
  UPDATE_USER: new KeyObject("updateUser", "id"),
  UPDATE_ROLE: new KeyObject("updateRole", "title"),
});

export const stateManager = {
  refreshState: (keyInfo, obj) => refreshState(keyInfo, obj),
  updateUser: {
    set: (id) => localStorage.setItem(KEYS.UPDATE_USER.stateKey, id),
    get: async () =>
      await fetchUser(localStorage.getItem(KEYS.UPDATE_USER.stateKey)),
    clear: () => localStorage.removeItem(KEYS.UPDATE_USER.stateKey),
  },
  updateRole: {
    set: (role) => localStorage.setItem(KEYS.UPDATE_ROLE.stateKey, role),
    get: async () =>
      await fetchRole(localStorage.getItem(KEYS.UPDATE_ROLE.stateKey)),
    clear: () => localStorage.removeItem(KEYS.UPDATE_ROLE.stateKey),
  },
};

/**
 * Refresh a passed obj state to new value or get saved value
 *
 * @param {KeyObject} keyInfo - Values to manipulate correct state.
 * @param {Object} obj - Object that contains or not new values.
 * @returns {Object} Return saved object or the object passad if not null.
 */
function refreshState(keyInfo, obj) {
  if (obj) stateManager[keyInfo.stateKey].set(obj[keyInfo.objKey]);
  return stateManager[keyInfo.stateKey].get();
}
