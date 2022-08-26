import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLAttributes } from "react";
import cx from "classnames";

import styles from "./Button.module.scss";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: "large" | "small";
};

const Button = ({
  children,
  disabled,
  size = "small",
  ...otherButtonProps
}: ButtonProps) => {
  return (
    <button
      className={cx(styles.root, styles[size], {
        [styles.disabled]: !!disabled,
      })}
      {...otherButtonProps}
    >
      {children}
    </button>
  );
};
export default Button;
