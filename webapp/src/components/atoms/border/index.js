import React from "react";

import styles from "./styles.module.scss";

const Border = ({ children, borderWidth = 2, padding, className, style }) => {
  const borderRadiusA = borderWidth * 160;
  const borderRadiusB = borderWidth * 1.5 + 18;
  return (
    <div
      style={{
        borderWidth: `${borderWidth}px`,
        borderRadius: `${borderRadiusA}px ${borderRadiusB}px ${borderRadiusA}px ${borderRadiusB}px/
        ${borderRadiusB}px ${borderRadiusA}px ${borderRadiusB}px ${borderRadiusA}px`,
        padding: padding,
        ...style,
      }}
      className={`${styles.container} ${className}`}
    >
      {children}
    </div>
  );
};

export default Border;
