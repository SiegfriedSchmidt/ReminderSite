import React, {FC} from 'react';
import {
  AlertDialog, AlertDialogBody,
  AlertDialogContent, AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

interface AlertDeleteEventProps {
  isOpen: boolean
  onProceed: (proceed: boolean) => void
  eventName: string
}

const AlertDeleteEvent: FC<AlertDeleteEventProps> = ({isOpen, onProceed, eventName}) => {
  const cancelRef = React.useRef(null)

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={() => onProceed(false)}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Удалить событие <p>"{eventName}"</p>
          </AlertDialogHeader>

          <AlertDialogBody>
            Вы уверены? Вы не сможете отменить это действие.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={() => onProceed(false)}>
              Отменить
            </Button>
            <Button colorScheme='red' onClick={() => onProceed(true)} ml={3}>
              Удалить
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default AlertDeleteEvent;