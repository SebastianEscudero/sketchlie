"use client";

import { useOrgButton } from "@/actions/use-create-org-dialog";

interface OrgButtonProps {
  children?: React.ReactNode;
};

export const OrgButton = ({
  children
}: OrgButtonProps) => {
  const OrgButton = useOrgButton();
    
  const onClick = () => {
    OrgButton.onOpen();
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
