'use client'

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { PortableText } from "next-sanity";
import IwiList from "./../../components/iwiList";

type authorModalProps = {
    title: string;
    iwi?: any[];
    profile?: any[];
}

export default function AuthorModal(props: authorModalProps) {
    const {title, iwi, profile} = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return <>
        <Button onPress={onOpen}>Open Modal</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' radius='none'>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                        <ModalBody>
                            {iwi ? (
                                <IwiList iwiPlural={iwi} target='stories' />
                            ) : null}

                            <PortableText
                                value={profile}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>
}