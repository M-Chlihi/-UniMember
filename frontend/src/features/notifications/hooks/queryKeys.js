export const adminNotificationKeys = {
  all: ["admin", "notifications"],

  lists: () => [...adminNotificationKeys.all, "list"],

  list: (params) => [...adminNotificationKeys.lists(), params],

  details: () => [...adminNotificationKeys.all, "detail"],

  detail: (notificationId) => [
    ...adminNotificationKeys.details(),
    notificationId,
  ],
};
