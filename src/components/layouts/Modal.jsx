
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import useWidget from "../../hooks/useWidget";

const ModalComponent = () => {

    const {closeModal,modal} = useWidget();

    const { children:Child,payload,isOpen,size,...rest } = modal


    console.log('size in modal component',size)
    
    return (
        <Modal
         isCentered
         scrollBehavior='inside'
         isOpen={isOpen}
         onClose={closeModal}
         size={'5xl'} 
         {...rest}
        >
          <ModalOverlay/>
          <ModalContent className="modalContent" maxH={'98vh'}  >
            <ModalBody>
               { Child && <Child payload={payload} />}
            </ModalBody>
          </ModalContent>
        </Modal>
  );
};

export default ModalComponent;
