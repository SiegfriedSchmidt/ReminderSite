import React, {FC} from 'react';
import {
  Button, HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, PinInput, PinInputField
} from "@chakra-ui/react";

interface ModelWindowCodeProps {
  onClose: () => void
  isOpen: boolean
  setCode: (val: string) => void
}

const ModelWindowCode: FC<ModelWindowCodeProps> = ({onClose, isOpen, setCode}) => {

  function onComplete(value: string) {
    console.log(1)
   setCode(value)
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Введите код</ModalHeader>
        <ModalCloseButton/>
        <ModalBody>
          <HStack>
            <PinInput autoFocus onComplete={onComplete} otp>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
              <PinInputField/>
            </PinInput>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModelWindowCode;