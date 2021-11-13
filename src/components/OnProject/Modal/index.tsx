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
import { memo, useCallback, useState } from "react";
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
  nameid: string;
  hasAdd: boolean;
};

// eslint-disable-next-line react/display-name
export const ModalComponent: React.VFC<Props> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [add, setAdd] = useState(false);
  const [value, setInputvalue] = useState("");
  const [moneyvalue, setMoneyValue] = useState<number>(0);

  const [checkedItems, setCheckedItems] = useState(
    [...Array(props.project[1])].map(() => {
      return true;
    })
  );

  // const [settlemember, setSettleMember] = useState<any>([]);

  const handleAdd = useCallback(() => {
    props.setAdd(true);
  }, [props]);

  const handleCloseAdd = useCallback(async () => {
    try {
      if (value == "") {
        throw "Input title.";
      }
      if (moneyvalue == 0) {
        throw "moneyvalue";
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
        throw List_paid_error;
      }
      //何人で割るかによって金額を変える
      const settlement: any[] = [];
      const newItems = checkedItems.filter((n) => {
        return n === true;
      });
      checkedItems.map((i, id: number) => {
        if (i === false) {
          return;
        } else {
          settlement.push({
            id: id,
            money: `${Math.ceil(moneyvalue / newItems.length)}`,
            payfor: props.id,
            projectId: props.project[2],
            what: value,
          });
        }
      });
      const { data: Settlement_list, error: Settlement_list_error } =
        await client.from("Settlement_list").insert(settlement);
      if (Settlement_list_error) {
        throw Settlement_list_error;
      }
      if (Settlement_list) {
        props.setAdd(false);
        setInputvalue("");
        setMoneyValue(0);
        setCheckedItems([]);
        props.setCount((i: number) => {
          return i + 1;
        });
      }
    } catch (e) {
      alert(e);
    }
  }, [value, moneyvalue, props, checkedItems, setInputvalue, setMoneyValue]);

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
                  checkedItems={checkedItems}
                  setCheckedItems={setCheckedItems}
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
});
