export const userKeys = {
  all: ["admin", "users"],

  list: (params) => [...userKeys.all, "list", params],

  detail: (id) => [...userKeys.all, "detail", id],
};
