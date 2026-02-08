import clsx from "clsx";
import { motion, type Variants } from "motion/react";

type BoardProps = {
  itemVariants: Variants;
  className?: string;
  board: {
    icon: string;
    task: string;
    explication: string;
  };
};

export const Board: React.FC<BoardProps> = ({
  itemVariants,
  className,
  board,
}) => {
  return (
    <motion.div
      className={clsx(
        className,
        "space-y-1 hover:bg-neutral-300/45 transition-colors rounded-sm",
      )}
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
    >
      <div className="font-medium text-sm flex items-center gap-2">
        <span className="text-lg">{board.icon}</span>
        {board.task}
      </div>
      <p className="ml-0.5 italic text-xs text-muted-foreground">
        {board.explication}
      </p>
    </motion.div>
  );
};
