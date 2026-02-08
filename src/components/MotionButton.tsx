import clsx from "clsx";
import { motion } from "motion/react";
import { Button } from "./ui/button";

type MotionButtonProprs = {
  children?: React.ReactNode;
  disabled?: boolean;
  scale?: "button" | "icon";
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null;
  variant?:
    | "link"
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
};

const SCALE_TYPE = {
  button: { begin: 1, disabled: 0.95, end: 1.05 },
  icon: { begin: 1, disabled: 0.9, end: 1.1 },
} as const;

export function MotionButton({
  children,
  disabled = false,
  scale = "button",
  size = "default",
  variant = "default",
  onClick,
  className,
}: MotionButtonProprs) {
  return (
    <motion.div
      initial={{ scale: SCALE_TYPE[scale].begin }}
      whileHover={{
        scale: disabled ? SCALE_TYPE[scale].disabled : SCALE_TYPE[scale].end,
      }}
      transition={{ duration: 0.2 }}
    >
      <Button
        className={clsx(
          className,
          disabled ? "cursor-not-allowed" : "cursor-pointer",
        )}
        onClick={onClick}
        size={size}
        variant={variant}
        disabled={disabled}
      >
        {children}
      </Button>
    </motion.div>
  );
}
