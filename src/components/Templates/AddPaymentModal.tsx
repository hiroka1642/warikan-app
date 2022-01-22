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
import { memo, useCallback, useState, useEffect } from "react";
import { client } from "src/libs/supabase";
import type { ProjectTypes, SettlementListTypes } from "src/types";
import { ButtonComponent, GrayButtonComponent } from "../Atom/button";
import { AddPayment } from "../Organisms/AddPayment";

type Props = {
  project: ProjectTypes;
  children: string;
  nameArr: string[];
};

// eslint-disable-next-line react/display-name
export const AddPaymentModal: React.VFC<Props> = memo((props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setInputvalue] = useState("");
  const [moneyvalue, setMoneyValue] = useState<number | null>(null);
  const [member, setMemberValue] = useState<number | null>(null);

  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  useEffect(() => {
    setCheckedItems(
      [...Array(props.project.numberOfPeople)].map(() => {
        return true;
      })
    );
  }, [props]);

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
            id: member,
            money: moneyvalue,
            what: value,
            projectId: props.project.projectId,
          },
        ]);
      if (PaymentList_error) {
        throw PaymentList_error;
      }
      //何人で割るかによって金額を変える
      const settlement: SettlementListTypes[] = [];
      const newItems = checkedItems.filter((n) => {
        return n === true;
      });
      checkedItems.map((i, id: number) => {
        //自分が自分のために払ったリストは作らない
        if (i === false || id === member) {
          return;
        } else {
          settlement.push({
            projectId: props.project.projectId,
            id: id,
            money: Math.ceil(moneyvalue / newItems.length),
            payer: member,
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
        setMoneyValue(null);
        setMemberValue(null);
        setCheckedItems(
          [...Array(props.project.numberOfPeople)].map(() => {
            return true;
          })
        );
        setInputvalue("");
      }
    } catch (e) {
      alert("登録できませんでした");
    }
  }, [
    value,
    moneyvalue,
    member,
    props.project.projectId,
    props.project.numberOfPeople,
    checkedItems,
  ]);

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
      <ButtonComponent
        onClick={handleOnOpen}
        className="w-full rounded-lg mt-6"
      >
        {props.children}
      </ButtonComponent>

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
              nameArr={props.nameArr}
            />
          </ModalBody>
          <ModalFooter>
            <GrayButtonComponent onClick={handleOnClose}>
              閉じる
            </GrayButtonComponent>

            <ButtonComponent onClick={handleCloseAdd}>追加する</ButtonComponent>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
});
