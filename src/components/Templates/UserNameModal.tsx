import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { InputComponent } from "../Atom/Input";
// import type { ProjectTypes } from "../../types";
import { client } from "../../libs/supabase";
import {
  ButtonComponent,
  GrayButtonComponent,
} from "src/components/Atom/button";
import { useRouter } from "next/dist/client/router";

type Props = {
  id: number;
  setNameId: Dispatch<SetStateAction<string[]>>;
  nameid: string[];
  name: string;
};

export const UserNameModal: React.VFC<Props> = (props) => {
  const router = useRouter();
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
        .eq("projectId", router.query.id);
      if (projectdata) {
        projectdata[0].userName.splice(props.id, 1, value);
        const { data: projectname, error: projectnameerror } = await client
          .from("Projects")
          .update({ userName: projectdata[0].userName })
          .eq("projectId", router.query.id);
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
  }, [value, router.query.id, props, onClose]);

  const handleOnOpen = () => {
    onOpen();
  };
  const handleOnClose = () => {
    onClose();
  };
  const handleChangeInputValue = (e: any) => {
    setInputvalue(e.target.value);
  };

  return (
    <>
      <GrayButtonComponent onClick={handleOnOpen}>
        {props.name}
      </GrayButtonComponent>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>名前を変更する</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputComponent
              value={value}
              onChange={handleChangeInputValue}
              placeholder={props.name}
            />
          </ModalBody>
          <ModalFooter>
            <GrayButtonComponent onClick={handleOnClose}>
              閉じる
            </GrayButtonComponent>
            <ButtonComponent onClick={handleChangeName}>
              変更する
            </ButtonComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
