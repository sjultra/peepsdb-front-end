
import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import useWidget from "../../hooks/useWidget";

const ModalComponent = () => {

    const {closeModal,modal} = useWidget();

    const { children:Child,payload,isOpen,size,scrollBehavior,...rest } = modal

    

    console.log('modal isOpen',isOpen)
    
    return (
        <Modal
         isCentered
         {...scrollBehavior?{scrollBehavior}:{}}
         isOpen={isOpen}
         onClose={closeModal}
         size={size || '5xl'} 
         {...rest}
        >
          <ModalOverlay/>
          <ModalContent className="modalContent"   >
               { Child && <Child payload={payload} />}
          </ModalContent>
        </Modal>
  );
};

export default ModalComponent;
