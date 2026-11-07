"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { useState } from "react";
import { TbX } from "react-icons/tb";

import { useAppStore } from "@/app/store/AppStoreProvider";
import { TablerIcon } from "@/lib/tabler-icon";
import { manageOriginUrl } from "@/lib/heatmap-api";
import { PortalButton } from "@/components/portal/portal-button";
import { PortalIconButton } from "@/components/portal/portal-icon-button";
import { pageTitleToProxyType } from "@/lib/proxy-page-title";

type PROPS = {
  pageTitle: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

export default function StyledModal({
  isOpen,
  onOpenChange,
  pageTitle,
}: PROPS) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [adding, setAdding] = useState(false);

  const addItem = useAppStore((state) => state.addItem);

  const handleSubmit = async (onClose: () => void) => {
    setAdding(true);
    if (!url) {
      setError(true);
      setAdding(false);

      return;
    }
    if (url) {
      const requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      const type = pageTitleToProxyType(pageTitle);
      const proxy = url.trim();

      const res = await fetch(
        manageOriginUrl({ url: proxy, type, request: "add" }),
        requestOptions as RequestInit,
      );

      if (res.ok) {
        addItem(url);

        onClose();
      } else {
        setError(true);
      }
      setAdding(false);
    }
  };

  return (
    <>
      <Modal
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "border border-border shadow-lg font-sans",
          body: "font-sans",
          footer: "border-t border-border font-sans",
          closeButton: "hidden",
        }}
        isOpen={isOpen}
        placement="center"
        radius="lg"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-card font-sans">
          {(onClose) => (
            <>
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Add origin
                  </p>
                  <p className="truncate text-base font-semibold leading-5 text-foreground">
                    {pageTitle}
                  </p>
                </div>
                <PortalIconButton
                  className="-mr-1.5"
                  label="Close"
                  motion="rotate"
                  type="button"
                  onClick={onClose}
                >
                  <TablerIcon aria-hidden className="size-4" icon={TbX} />
                </PortalIconButton>
              </div>
              <ModalBody className="gap-2 pt-2">
                <Input
                  classNames={{
                    inputWrapper:
                      "border border-input bg-background shadow-none h-11",
                    input: "text-sm",
                    label: "text-sm font-medium text-foreground",
                  }}
                  errorMessage={
                    error ? "Enter a valid URL to continue." : undefined
                  }
                  isInvalid={error}
                  label="Site URL"
                  labelPlacement="outside"
                  placeholder="example.com or https://example.com"
                  onValueChange={(value) => {
                    error && setError(false);
                    setUrl(value);
                  }}
                />
              </ModalBody>
              <ModalFooter className="gap-2">
                <PortalButton
                  disabled={adding}
                  revealIcon="x"
                  type="button"
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </PortalButton>
                <PortalButton
                  disabled={adding}
                  revealIcon="check"
                  type="button"
                  onClick={() => handleSubmit(onClose)}
                >
                  {adding ? "Adding…" : "Add origin"}
                </PortalButton>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
