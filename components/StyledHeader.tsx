"use client";

import { useDisclosure } from "@nextui-org/react";
import { Button } from "@nextui-org/button";

import StyledModal from "./StyledModal";

type PROPS = {
  pageTitle: string;
};

const PAGE_BLURB: Partial<Record<string, string>> = {
  Origins: "Websites on the allow list for Heatmap proxy traffic.",
  SPAs: "Single-page applications registered for proxy routing.",
  Proxy4: "Proxy tier 4 origins.",
  Proxy5: "Proxy tier 5 origins.",
  Proxy6: "Proxy tier 6 origins.",
};

export default function StyledHeader({ pageTitle }: PROPS) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const blurb = PAGE_BLURB[pageTitle];

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Subscriptions
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
          {pageTitle}
        </h1>
        {blurb && (
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {blurb}
          </p>
        )}
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        <Button
          className="font-semibold"
          color="primary"
          radius="lg"
          onClick={onOpen}
        >
          Add origin
        </Button>
        <StyledModal
          isOpen={isOpen}
          pageTitle={pageTitle}
          onOpenChange={onOpenChange}
        />
      </div>
    </div>
  );
}
