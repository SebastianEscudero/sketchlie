import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
};

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  return (
    <div className="relative dark:bg-[#020817] bg-zinc-100 p-3">
      <p className="text-[14px] truncate max-w-[calc(100%-20px)]" style={{ color: document.documentElement.classList.contains("dark") ? "white" : "black" }}>
        {title}
      </p>
      <p className="transition-opacity text-[11px] truncate dark:text-zinc-300 text-muted-foreground">
        {authorLabel}, {createdAtLabel}
      </p>
      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 dark:text-white dark:hover:text-blue-600 text-muted-foreground hover:text-blue-600",
          disabled && "cursor-not-allowed opacity-75"
        )}
      >
        <Star
          className={cn(
            "h-4 w-4",
            isFavorite && "fill-blue-600 text-blue-600"
          )}          
        />
      </button>
    </div>
  );
};