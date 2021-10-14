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
import { AddPayment } from "./AddPayment";
import { TableOnModalBody } from "./TableOnModalBody";

type Props = {
  setAdd: Dispatch<SetStateAction<boolean>>;
  id: number;
  project: string[];
  setCount: Dispatch<SetStateAction<number>>;
  children: string;
  nameid: Element[];
  hasAdd: boolean;
};

export const ModalComponent = (props: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [add, setAdd] = useState(false);
  const [value, setInputvalue] = useState("");
  const [moneyvalue, setMoneyValue] = useState(0);

  const [settlemember, setSettleMember] = useState<any>([]);

  const handleAdd = useCallback(() => {
    props.setAdd(true);
  }, [props]);

  const handleCloseAdd = useCallback(async () => {
    if (value == "") {
      alert("Input title.");
      return;
    }
    if (moneyvalue == 0) {
      alert("moneyvalue");
      return;
    }

    const { error: List_paid_error } = await client.from("List_paid").insert([
      {
        id: props.id,
        money: moneyvalue,
        paid: value,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        project_id: props.project[2],
      },
    ]);
    if (List_paid_error) {
      alert(List_paid_error);
    } else {
      //何人で割るかによって金額を変える
      const settlement: any[] = [];

      settlemember.map((id: number) => {
        settlement.push({
          id: id,
          money: `${Math.ceil(moneyvalue / settlemember.length)}`,
          payfor: props.id,
          projectId: props.project[2],
          what: value,
        });
      });

      const { data: Settlement_list, error: Settlement_list_error } =
        await client.from("Settlement_list").insert(settlement);
      if (Settlement_list_error) {
        alert(Settlement_list_error);
      } else {
        if (Settlement_list) {
          props.setAdd(false);
          setInputvalue("");
          setMoneyValue(0);
          setSettleMember([]);
          props.setCount((i: number) => {
            return i + 1;
          });
        }
      }
    }
  }, [props, value, moneyvalue, settlemember]);

  const handleSettleMember = useCallback(
    (li) => {
      setSettleMember([...settlemember, li]);
    },
    [settlemember]
  );

  const handleOnOpen = () => {
    onOpen();
  };
  const handleOnClose = () => {
    onClose();
  };

  return (
    <>
      <Button onClick={handleOnOpen}>{props.children}</Button>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.nameid[props.id] || props.id}さんの支払い
          </ModalHeader>
          <ModalCloseButton />
          {props.hasAdd ? (
            <>
              <ModalBody>
                <AddPayment
                  value={value}
                  setInputvalue={setInputvalue}
                  moneyvalue={moneyvalue}
                  setMoneyValue={setMoneyValue}
                  project={props.project}
                  // eslint-disable-next-line react/jsx-handler-names
                  handleSettleMember={handleSettleMember}
                  nameid={props.nameid}
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
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
                <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
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
