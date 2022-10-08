import { PropsWithChildren } from "react";
import { AnimatePresence } from "framer-motion";

export const TaskList: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ul className="flex flex-col w-full gap-y-1 overflow-y-auto">
      <AnimatePresence>{children}</AnimatePresence>
    </ul>
  );
};
