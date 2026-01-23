export const IPC = {
  CLIPS_GET_ALL: "clips:get-all",
  CLIPS_ADD: "clips:add",
  CLIPS_REMOVE: "clips:remove",
  CLIPS_DELETE_ALL: "clips:delete-all",

  CLIPS_SUBSCRIBE: "clips:subscribe",

  CLIPS_GET_ALL_PINNED: "clips:get-all-pinned",
  CLIPS_PIN: "clips:pin",
  CLIPS_UNPIN: "clips:unpin",
  CLIPS_DELETE_PINNED: "clips:delete-pinned",
  CLIPS_DELETE_ALL_PINNED: "clips:delete-all-pinned",


  SETTINGS_GET: "settings:get",
  SETTINGS_SET: "settings:set",
  SETTINGS_SUBSCRIBE: "settings:subscribe",

  APP_QUIT: "app:quit",
} as const
