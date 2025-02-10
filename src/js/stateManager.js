import {
  fetchInstitution,
  fetchQuestion,
  fetchQuestionnaire,
  fetchRole,
  fetchUser,
} from "./utils.js";

class KeyObject {
  constructor(stateKey, objKey) {
    this.stateKey = stateKey;
    this.objKey = objKey;
  }
}

export const KEYS = Object.freeze({
  UPDATE_USER: new KeyObject("updateUser", "id"),
  UPDATE_ROLE: new KeyObject("updateRole", "title"),
  UPDATE_INSTITUTION: new KeyObject("updateInstitution", "short_name"),
  UPDATE_QUESTION: new KeyObject("updateQuestion", "id"),
  UPDATE_QUSTIONNAIRE: new KeyObject("updateQuestionnaire", "id"),
});

export const stateManager = {
  refreshState: (keyInfo, obj) => refreshState(keyInfo, obj),
  updateUser: {
    set: (id) => setState(KEYS.UPDATE_USER, id),
    get: async () =>
      await fetchUser(localStorage.getItem(KEYS.UPDATE_USER.stateKey)),
    clear: () => clearState(KEYS.UPDATE_USER.stateKey),
  },
  updateRole: {
    set: (role) => setState(KEYS.UPDATE_ROLE.stateKey, role),
    get: async () => await fetchRole(getState(KEYS.UPDATE_ROLE.stateKey)),
    clear: () => clearState(KEYS.UPDATE_ROLE.stateKey),
  },
  updateInstitution: {
    set: (institution) =>
      setState(KEYS.UPDATE_INSTITUTION.stateKey, institution),
    get: async () =>
      await fetchInstitution(getState(KEYS.UPDATE_INSTITUTION.stateKey)),
    clear: () => clearState(KEYS.UPDATE_INSTITUTION.stateKey),
  },
  updateQuestion: {
    set: (question) => setState(KEYS.UPDATE_QUESTION.stateKey, question),
    get: async () =>
      await fetchQuestion(getState(KEYS.UPDATE_QUESTION.stateKey)),
    clear: () => clearState(KEYS.UPDATE_QUESTION.stateKey),
  },
  updateQuestionnaire: {
    set: (questionnaire) =>
      setState(KEYS.UPDATE_QUSTIONNAIRE.stateKey, questionnaire),
    get: async () =>
      await fetchQuestionnaire(getState(KEYS.UPDATE_QUSTIONNAIRE.stateKey)),
    clear: () => clearState(KEYS.UPDATE_QUSTIONNAIRE.stateKey),
  },
};

const setState = (key, value) => localStorage.setItem(key, value);
const getState = (key) => localStorage.getItem(key);
const clearState = (key) => localStorage.removeItem(key);

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
