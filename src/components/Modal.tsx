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
import { AddPayment } from "./AddPayment";
import { TableOnModalBody } from "./TableOnModalBody";

export const ModalComponent = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [add, setAdd] = useState(false);
  const [value, setInputvalue] = useState("");
  const [moneyvalue, setMoneyValue] = useState(undefined);
  const handleAdd = useCallback(() => {
    setAdd(true);
  }, []);

  const handleCloseAdd = useCallback(async () => {
    if (value == "") {
      alert("Input title.");
      return;
    }
    const { data: List_paid, error: List_paid_error } = await client
      .from("List_paid")
      .insert([
        {
          id: props.id,
          money: moneyvalue,
          paid: value,
          project_id: props.project[2],
        },
      ]);
    if (List_paid_error) {
      alert(List_paid_error);
    } else {
      // if (List_paid) {
      //   setAdd(false);
      //   setInputvalue("");
      //   setMoneyValue(undefined);
      // }
    }

    const { data: Settlement_list, error: Settlement_list_error } = await client
      .from("Settlement_list")
      .insert([
        {
          id: 2,
          money: moneyvalue,
          payfor: props.id,
          projectId: props.project[2],
          what: value,
        },
      ]);
    if (Settlement_list_error) {
      alert(Settlement_list_error);
    } else {
      console.log(Settlement_list);

      if (Settlement_list) {
        setAdd(false);
        setInputvalue("");
        setMoneyValue(undefined);
      }
    }
  }, [props, value, moneyvalue]);

  return (
    <>
      <Button onClick={onOpen}>追加</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Aさんの支払い</ModalHeader>
          <ModalCloseButton />
          {add ? (
            <>
              <ModalBody>
                <AddPayment
                  value={value}
                  setInputvalue={setInputvalue}
                  moneyvalue={moneyvalue}
                  setMoneyValue={setMoneyValue}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  閉じる
                </Button>
                <Button variant="ghost" onClick={handleCloseAdd}>
                  追加する
                </Button>
              </ModalFooter>
            </>
          ) : (
            <>
              <ModalBody>
                <TableOnModalBody id={props.id} project={props.project} />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  閉じる
                </Button>
                <Button variant="ghost" onClick={handleAdd}>
                  追加する
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
