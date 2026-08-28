export const adminNotificationKeys = {
  all: ["admin", "notifications"],

  history: (params) => [...adminNotificationKeys.all, "history", params],

  summary: (params) => [...adminNotificationKeys.all, "summary", params],

  detail: (id) => [...adminNotificationKeys.all, "detail", id],
};
