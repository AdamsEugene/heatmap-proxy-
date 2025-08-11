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

      return;
    }
    if (url) {
      const requestOptions = {
        method: "POST",
        redirect: "follow",
      };

      const type =
        pageTitle === "SPAs"
          ? "spa"
          : pageTitle === "Proxy4"
          ? "proxy4"
          : pageTitle === "Proxy5"
          ? "proxy5"
          : pageTitle === "Proxy6"
          ? "proxy6"
          : "website";
      const proxy = url.trim();

      const res = await fetch(
        `https://stage9.heatmapcore.com/backend/settings/manageorigin?url=${proxy}&type=${type}&request=add`,
        requestOptions as RequestInit
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
      <Modal isOpen={isOpen} placement="top" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add New {pageTitle}
              </ModalHeader>
              <ModalBody>
                <Input
                  isInvalid={error}
                  label="Add the url"
                  labelPlacement="outside"
                  placeholder="loveamika.com"
                  onValueChange={(value) => {
                    error && setError(false);
                    setUrl(value);
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={adding}
                  onPress={() => handleSubmit(onClose)}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
