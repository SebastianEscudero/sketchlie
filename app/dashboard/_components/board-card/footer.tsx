import { MoreHorizontal, Star } from "lucide-react";
import { Actions } from "@/components/actions"; // Add this import

import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  disabled: boolean;
  org: any;
  id: string;
  isPrivate: boolean;
};

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  disabled,
  org,
  id,
  isPrivate
}: FooterProps) => {
  return (
    <div className="relative dark:bg-[#2C2C2C] bg-white p-2">
      <p className="text-[13px] truncate max-w-[calc(100%-20px)] text-black dark:text-white">
        {title}
      </p>
      <p className="transition-opacity text-[11px] truncate dark:text-zinc-300 text-muted-foreground">
        {authorLabel}, {createdAtLabel}
      </p>
      <Actions
        org={org}
        id={id}
        title={title}
        side="right"
        isPrivate={isPrivate}
      >
        <button
          disabled={disabled}
          className={cn(
            "absolute top-3 right-3 dark:text-white dark:hover:text-blue-600 text-muted-foreground hover:text-blue-600",
            disabled && "cursor-not-allowed opacity-75"
          )}
        >
          <MoreHorizontal
            className="text-zinc-700 dark:text-white opacity-75 hover:opacity-100 transition-opacity"
          />
        </button>
      </Actions>
    </div>
  );
};