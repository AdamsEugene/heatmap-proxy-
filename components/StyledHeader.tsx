"use client";

import { useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import StyledModal from "./StyledModal";

import { title } from "@/components/primitives";

type PROPS = {
  pageTitle: string;
};

export default function StyledHeader({ pageTitle }: PROPS) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex items-center justify-between w-full">
      <div>
        <span className={title()}>{pageTitle}&nbsp;</span>
        <span className={title({ color: "violet" })}>Proxy</span>
      </div>
      <Button color="primary" onClick={onOpen}>
        Add site
      </Button>
      <StyledModal
        isOpen={isOpen}
        pageTitle={pageTitle}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
