export enum NotificationType {
  Error = "error",
  Warning = "warning",
  Success = "success",
}

export type INotification = {
  type: NotificationType;
  message: string;
};
