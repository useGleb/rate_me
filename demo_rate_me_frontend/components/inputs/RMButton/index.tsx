import React from "react";
import styles from "./rmbutton.module.scss";
import { useSpring, animated } from "react-spring";
import theme from "../../../styles/theme";

type AnimationProps = {
  tension: number;
  friction: number;
};

interface RMButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  loadingContainerAnimationProps?: AnimationProps;
  loadingAnimationMaxWidth?: number;
}

const RMButton: React.FC<RMButtonProps> = (props) => {
  const rotateAnimationStyles = useSpring({
    from: {
      transform: "rotate(0deg)",
    },
    to: {
      transform: "rotate(360deg)",
    },
    loop: true,
  });
  const {
    children,
    loading,
    loadingContainerAnimationProps,
    loadingAnimationMaxWidth = 1920,
  } = props;
  const buttonContainerAnimatedStyles = useSpring({
    width: "100%",
    maxWidth: !loading ? `${loadingAnimationMaxWidth}px` : "40px",
    borderRadius: !loading ? "6px" : "50px",
    config: loadingContainerAnimationProps
      ? loadingContainerAnimationProps
      : {
          tension: 180,
          friction: 24,
        },
  });

  return (
    <animated.button
      className={styles.button}
      {...props}
      style={{
        ...buttonContainerAnimatedStyles,
        color: theme.palette.secondary.main,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      {loading ? (
        <animated.div
          className={styles.progress_circle}
          style={rotateAnimationStyles}
        />
      ) : (
        <div>{children}</div>
      )}
    </animated.button>
  );
};

export default RMButton;
