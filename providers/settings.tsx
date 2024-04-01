"use client";

import { SettingsModal } from "@/components/auth/settings-dialog";
import { useEffect, useState } from "react";

export const SettingsModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      <SettingsModal/>
    </>
  );
};