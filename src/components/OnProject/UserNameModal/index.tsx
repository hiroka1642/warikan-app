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
import { client } from "src/libs/supabase";
import { InputComponent } from "../../Atom/Input";
import type { ProjectTypes } from "src/types";

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
        .from("Project_name")
        .select("Username")
        .eq("project_id", props.project.projectId);
      if (projectdata) {
        projectdata[0].Username.splice(props.id, 1, value);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: projectname, error: projectnameerror } = await client
          .from("Project_name")
          // eslint-disable-next-line @typescript-eslint/naming-convention
          .update({ Username: projectdata[0].Username })
          .eq("project_id", props.project.projectId);
        if (projectname) {
          props.setNameId(projectdata[0].Username);
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
      <Button onClick={handleOnOpen} variant="ghost">
        {props.children}
      </Button>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>名前変更</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputComponent value={value} setInputvalue={setInputvalue}>
              {props.nameid[props.id] || props.id}
            </InputComponent>
          </ModalBody>
          <ModalFooter>
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
