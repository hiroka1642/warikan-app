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
import { client } from "src/libs/supabase";
import { InputComponent } from "../../Atom/Input";

type Props = {
  project: any;
  id: any;
  setNameId: any;
  children: any;
  nameid: any;
};

export const UserNameModal = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setInputvalue] = useState("");

  const handleCloseAdd = useCallback(async () => {
    if (value == "") {
      alert("Input title.");
      return;
    }

    const { data: projectdata, error: projecterror } = await client
      .from("Project_name")
      .select("Username")
      .eq("project_id", props.project[2]);

    if (projecterror) {
      alert(projecterror);
    } else {
      if (projectdata) {
        projectdata[0].Username.splice(props.id, 1, value);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: projectname, error: projectnameerror } = await client
          .from("Project_name")
          // eslint-disable-next-line @typescript-eslint/naming-convention
          .update({ Username: projectdata[0].Username })
          .eq("project_id", props.project[2]);
        if (projectnameerror) {
          alert(projectnameerror);
        } else {
          props.setNameId(projectdata[0].Username);
          setInputvalue("");
          onClose();
        }
      }
    }
  }, [value, props, onClose]);

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
              {/* {props.project[3][props.id] || props.id} */}
              {props.nameid[props.id] || props.id}
            </InputComponent>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
              閉じる
            </Button>
            <Button onClick={handleCloseAdd}>変更する</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
