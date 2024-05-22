import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import { Button } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks'
import { Image } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

import React from 'react'
import { Modal,ModalOverlay,ModalHeader,ModalCloseButton,ModalBody,ModalFooter,ModalContent } from '@chakra-ui/react';

const ProfileModal = ({user,children}) => {

    const{ isOpen,onOpen, onClose } =  useDisclosure();

    // console.log(user);
  return (
    <>
    {
        children ? (<span onClick={onOpen}>{children}</span> 
    ) : (
        <IconButton
        d={{base:"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}/>
        )}


<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            display ="flex"
            justifyContent="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="space-between"
          >
            <Image 
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}/>

            <Text
            fontSize={{base:"28px",md:"30px"}}
            fontFamily="Work sans"
            >
                Email={user.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
</Modal>

    </>
  )
}

export default ProfileModal