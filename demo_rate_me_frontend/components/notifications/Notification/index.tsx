import React, { useMemo } from "react";
import { NotificationType } from "../../../shared/interfaces/notification.interface";
import WarningIcon from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import SuccessIcon from "@mui/icons-material/CheckCircle";
import styles from "./notification.module.scss";
import { Divider, Typography } from "@mui/material";
import { useSpring, animated } from "react-spring";
type NotificationProps = {
  type: NotificationType;
  message: string;
  onAccept: () => void;
  index: number;
};

const Notification: React.FC<NotificationProps> = (props) => {
  const { type, message, onAccept } = props;
  const [animatedStyles, api] = useSpring(() => ({
    from: {
      transform: "translateX(100%)",
    },
    to: {
      transform: "translateX(0%)",
    },
  }));

  const icon = useMemo(() => {
    switch (type) {
      case NotificationType.Error:
        return (
          <ErrorIcon style={{ width: "48px", height: "48px" }} color="error" />
        );
      case NotificationType.Success:
        return (
          <SuccessIcon
            style={{ width: "48px", height: "48px" }}
            color="success"
          />
        );
      case NotificationType.Warning:
        return (
          <WarningIcon
            style={{ width: "48px", height: "48px" }}
            color="warning"
          />
        );
      default:
        return (
          <SuccessIcon
            style={{ width: "48px", height: "48px" }}
            color="success"
          />
        );
    }
  }, [type]);

  const title = useMemo(() => {
    switch (type) {
      case NotificationType.Error:
        return "Error";
      case NotificationType.Success:
        return "Success";
      case NotificationType.Warning:
        return "Warning";
      default:
        "Success";
    }
  }, [type]);
  const handleOnAccept = async () => {
    onAccept();
  };

  return (
    <animated.div
      {...props}
      key={props.index}
      className={styles.notification}
      style={animatedStyles}
    >
      {icon}
      <div className={styles.message_container}>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{message}</Typography>
      </div>
      <Divider orientation="vertical" flexItem />
      <Typography
        variant="h6"
        className={styles.accept_button}
        onClick={handleOnAccept}
      >
        OK
      </Typography>
    </animated.div>
  );
};

export default React.memo(Notification);
