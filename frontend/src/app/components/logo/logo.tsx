import React from "react";

import styles from "./logo.module.scss";

interface Props {
  fontSize: string;
}

const Logo: React.FC<Props> = ({ fontSize }) => (
  <h1 className={styles.logo} style={{ fontSize: fontSize }}>
    Moon
  </h1>
);

export { Logo };
