const USER_KEY = "userId";

export const stateManager = {
  userId: {
    set: (id) => localStorage.setItem(USER_KEY, id),
    get: () => localStorage.getItem(USER_KEY),
    clear: () => localStorage.removeItem(USER_KEY),
  },
};
