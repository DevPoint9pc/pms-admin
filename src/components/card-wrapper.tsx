import { cn } from "@/lib/utils";
import type React from "react";

type CardWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string;
  children: React.ReactNode;
};

const CardWrapper: React.FC<CardWrapperProps> = (props) => {
  // border: 1px solid #

  return (
    <div
      {...props}
      className={cn(
        "px-3 md:px-4 py-4 flex-1 md:py-6 bg-[#1B1B1D]  border border-border/50 rounded-sm  ",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default CardWrapper;
