import PropTypes from "prop-types";

const Notification = ({ message }) => {
  return <div className="success">{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
