"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for conditional class names.

type AlertProps = {
  children: ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  className?: string;
};

export function Alert({ children, variant = "info", className }: AlertProps) {
  const baseClasses = "flex items-start p-4 rounded-lg border";
  const variantClasses = {
    success: "bg-green-50 border-green-400 text-green-800",
    error: "bg-red-50 border-red-400 text-red-800",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
  };

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
}

type AlertDescriptionProps = {
  children: ReactNode;
  className?: string;
};

export function AlertDescription({ children, className }: AlertDescriptionProps) {
  return <p className={cn("text-sm", className)}>{children}</p>;
}
