import { STATUS } from "../constants/contants";

const Notification = ({ message, type }) => {
  let notificationStyle;
  switch (type) {
    case STATUS.SUCCESS:
      notificationStyle = "success";
      break;
    case STATUS.FAILURE:
      notificationStyle = "failure";
      break;
    default:
      notificationStyle = "";
  }

  return <div className={`notification ${notificationStyle}`}>{message}</div>;
};

export default Notification;
