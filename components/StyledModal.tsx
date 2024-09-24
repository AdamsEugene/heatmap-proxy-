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

import { addProxy } from "@/app/api/apiGet";

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
                  onPress={() => {
                    if (!url) {
                      setError(true);

                      return;
                    }
                    url &&
                      addProxy({
                        proxy: url.trim(),
                        type: pageTitle === "SPAs" ? "spa" : "origin",
                      });
                  }}
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
