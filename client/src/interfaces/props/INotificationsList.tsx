export default interface INotificationsList {
  anchorEl: null | HTMLElement;
  handleClose: any;
  open: boolean;
  realTimeNotifications:any[];
  setNotificationCount:Function;
}
