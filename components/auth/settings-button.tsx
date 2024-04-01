"use client";

import { useSettingsDialog } from "@/actions/use-settings-dialog";

interface SettingsButtonProps {
  children?: React.ReactNode;
};

export const SettingsButton = ({
  children
}: SettingsButtonProps) => {
  const settingsDialog = useSettingsDialog();
    
  const onClick = () => {
    settingsDialog.onOpen();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
