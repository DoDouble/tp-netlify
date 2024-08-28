'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PortableText } from "next-sanity";

type modalBlockProps = {
    title: string;
    body: any[];
}

export default function ModalBlock(props: modalBlockProps) {
    const {title, body} = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    console.log('props:', props);
    console.log('title:', title);

    return <>
        <Button onPress={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' radius='none'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            <PortableText
                                value={body}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Action
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}