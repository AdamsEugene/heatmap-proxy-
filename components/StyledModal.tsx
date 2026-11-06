"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState } from "react";

import { useAppStore } from "@/app/store/AppStoreProvider";
import { manageOriginUrl } from "@/lib/heatmap-api";
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
        backdrop="blur"
        classNames={{
          base: "border border-border shadow-lg",
          header: "border-b border-border",
          footer: "border-t border-border",
        }}
        isOpen={isOpen}
        placement="center"
        radius="lg"
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
      >
        <ModalContent className="bg-card">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 pb-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Add origin
                </p>
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  {pageTitle}
                </span>
              </ModalHeader>
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
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="font-semibold"
                  color="primary"
                  isLoading={adding}
                  onPress={() => handleSubmit(onClose)}
                >
                  Add origin
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
