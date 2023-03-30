
import { Modal,  ModalContent, ModalOverlay } from "@chakra-ui/react";
import React from "react";
import useWidget from "../../hooks/useWidget";

const ModalComponent = () => {

    const {closeModal,modal} = useWidget();

    const { children:Child,payload,isOpen,size,scrollBehavior,...rest } = modal

    // console.log('close modal fn',closeModal)

    // console.log('modal',modal)
    
    return (
        <Modal
         isCentered
         isOpen={isOpen}
         onClose={closeModal}
         size={size || '3xl'} 
         {...scrollBehavior?{scrollBehavior}:{}}
         {...rest}
         
        //  onEsc={closeModal}
        >
          <ModalOverlay/>
          <ModalContent className="modalContent"  mx="6">
               { Child && <Child {...payload} />}
          </ModalContent>
        </Modal>
  );
};

export default ModalComponent;
