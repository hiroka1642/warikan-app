import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { InputComponent } from "../Atom/Input";
import type { ProjectTypes } from "../../types";
import { client } from "../../libs/supabase";
import { ButtonComponent } from "src/components/Atom/button";

type Props = {
  project: ProjectTypes;
  id: number;
  setNameId: Dispatch<SetStateAction<string[]>>;
  children: JSX.Element;
  nameid: string[];
};

export const UserNameModal: React.VFC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setInputvalue] = useState<string>("");

  const handleChangeName = useCallback(async () => {
    try {
      if (value == "") {
        alert("Input title.");
        return;
      }
      const { data: projectdata, error: projecterror } = await client
        .from("Projects")
        .select("userName")
        .eq("projectId", props.project.projectId);
      if (projectdata) {
        projectdata[0].userName.splice(props.id, 1, value);
        const { data: projectname, error: projectnameerror } = await client
          .from("Projects")
          .update({ userName: projectdata[0].userName })
          .eq("projectId", props.project.projectId);
        if (projectname) {
          props.setNameId(projectdata[0].userName);
          setInputvalue("");
          onClose();
        }
        if (projectnameerror) {
          throw projectnameerror;
        }
      }
      if (projecterror) {
        throw projecterror;
      }
    } catch (e) {
      alert(e);
    }
  }, [value, props, setInputvalue, onClose]);

  const handleOnOpen = () => {
    onOpen();
  };
  const handleOnClose = () => {
    onClose();
  };

  return (
    <>
      <ButtonComponent onClick={handleOnOpen}>{props.nameid[props.id]}</ButtonComponent>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>名前変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputComponent value={value} setInputvalue={setInputvalue}>
              {props.nameid[props.id]}
            </InputComponent>
          </ModalBody>
          <ModalFooter>
            <ButtonComponent onClick={handleOnOpen}> 閉じる</ButtonComponent>

            <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
              閉じる
            </Button>
            <Button onClick={handleChangeName}>変更する</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
