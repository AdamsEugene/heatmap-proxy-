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

type PROPS = {
  pageTitle: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  setAllData: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function StyledModal({
  isOpen,
  onOpenChange,
  pageTitle,
  setAllData,
}: PROPS) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [adding, setAdding] = useState(false);

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

      const type = pageTitle === "SPAs" ? "spa" : "origin";
      const proxy = url.trim();

      const res = await fetch(
        `https://dashboard.heatmap.com/index.php?module=API&method=PaymentIntegration.manageOrigin&url=${proxy}&type=${type}&request=add`,
        requestOptions as RequestInit
      );
      const result = await res.json();

      if (result && result.result === "success") {
        setAllData((p) => (p ? [url, ...p] : [url]));

        onClose();
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
