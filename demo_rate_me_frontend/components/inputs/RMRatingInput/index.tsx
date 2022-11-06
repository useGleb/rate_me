import React, { useMemo, useState } from "react";
import { useTransition, animated } from "react-spring";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import styles from "./rm_rating_input.module.scss";
import { Typography } from "@mui/material";

type RMRatingInputProps = {
  label: string;
  value: number;
  onChange: (arg1: number) => void;
};

const RMRatingInput: React.FC<RMRatingInputProps> = ({
  label,
  value,
  onChange,
  ...rest
}) => {
  const scaleGenerated = useMemo(() => {
    const scale = [1, 2, 3, 4, 5];
    return scale.map((_, index) => {
      const isSelected = index + 1 <= value;
      return (
        <div
          key={index}
          onClick={() => {
            onChange(index + 1);
          }}
        >
          {value <= 0 ? (
            <StarBorderIcon color="info" />
          ) : isSelected && value > 0 ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderIcon color="warning" />
          )}
        </div>
      );
    });
  }, [value, onChange]);

  return (
    <div className={styles.rating_container} {...rest}>
      <Typography variant="subtitle1">{label}</Typography>
      <div className={styles.scale_container}>{scaleGenerated}</div>
    </div>
  );
};

export default React.memo(RMRatingInput);
