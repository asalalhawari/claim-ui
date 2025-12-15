import React, { PropsWithChildren } from "react";

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export const Card = ({ className = "", children }: CardProps) => {
  return (
    <div className={`rounded border bg-white ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ className = "", children }: CardProps) => {
  return <div className={className}>{children}</div>;
};
