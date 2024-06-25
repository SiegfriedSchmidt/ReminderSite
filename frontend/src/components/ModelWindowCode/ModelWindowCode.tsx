import React, {FC, useEffect, useState} from 'react';
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
import useConfiguredToast from "../../hooks/useConfiguredToast.tsx";

interface ModelWindowCodeProps {
  onClose: () => void
  isOpen: boolean
  onComplete: (code: string) => void
  expirationTime: number
}

const ModelWindowCode: FC<ModelWindowCodeProps> = ({onClose, isOpen, onComplete, expirationTime}) => {
  const [timeLeft, setTimeLeft] = useState(expirationTime)
  const [isTimerActive, setIsTimerActive] = useState(true)
  const {errorToast} = useConfiguredToast()

  useEffect(() => {
    if (isOpen) {
      setIsTimerActive(true)
      setTimeLeft(expirationTime)
    } else {
      setIsTimerActive(false)
    }
  }, [isOpen, expirationTime]);

  useEffect(() => {
    if (isTimerActive) {
      if (timeLeft == 0) {
        setIsTimerActive(false)
        onClose()
        errorToast('Время ввода кода закончилось!')
        return
      }
      setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    }
  }, [isTimerActive, timeLeft]);


  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Введите код <p style={{display: "inline-block"}}>{timeLeft}s</p></ModalHeader>
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