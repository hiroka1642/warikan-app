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
import { client } from "src/libs/supabase";
import type { ProjectTypes } from "src/types";
import { AddPayment } from "./PaymentModal/AddPayment";

type Props = {
  id: number;
  project: ProjectTypes;
  children: string;
  nameid: string[];
};

// eslint-disable-next-line react/display-name
export const AddPaymentModal: React.VFC<Props> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setInputvalue] = useState("");
  const [moneyvalue, setMoneyValue] = useState<number | null>(null);
  const [member, setMemberValue] = useState("メンバーを選択してください");
  

  const [checkedItems, setCheckedItems] = useState(
    [...Array(props.project.numberOfPeople)].map(() => {
      return true;
    })
  );

  const handleCloseAdd = useCallback(async () => {
    try {
      if (value == "") {
        throw "Input title.";
      }
      if (moneyvalue == null || 0) {
        throw "moneyvalue";
      }
      const { error: PaymentList_error } = await client
        .from("PaymentList")
        .insert([
          {
            id: props.id,
            money: moneyvalue,
            what: value,
            projectId: props.project.projectId,
          },
        ]);
      if (PaymentList_error) {
        throw PaymentList_error;
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
            payer: props.id,
            projectId: props.project.projectId,
            what: value,
          });
        }
      });
      const { data: SettlementList, error: SettlementList_error } = await client
        .from("SettlementList")
        .insert(settlement);
      if (SettlementList_error) {
        throw SettlementList_error;
      }
      if (SettlementList) {
        setInputvalue("");
        setMoneyValue(0);
        setCheckedItems(
          [...Array(props.project.numberOfPeople)].map(() => {
            return true;
          })
        );
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
    setCheckedItems(
      [...Array(props.project.numberOfPeople)].map(() => {
        return true;
      })
    );
  };

  return (
    <>
      <Button onClick={handleOnOpen}>{props.children}</Button>

      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>たてかえ追加</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <AddPayment
              value={value}
              setInputvalue={setInputvalue}
              moneyvalue={moneyvalue}
              setMoneyValue={setMoneyValue}
              member={member}
              setMemberValue={setMemberValue}
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
        </ModalContent>
      </Modal>
    </>
  );
});
