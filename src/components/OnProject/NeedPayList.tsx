import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { client } from "src/libs/supabase";
import { ModalComponent } from "./Modal";
import { SettlementListItem } from "./SettlementListItem";
import { UserNameModal } from "../OnProject/UserNameModal";
// import { useRouter } from "next/dist/client/router";

type Props = {
  project: string[];
  id: number;
  nameid: string;
  setCount: Dispatch<SetStateAction<number>>;
  setNameId: Dispatch<SetStateAction<string>>;
  count: number;
};

export const NeedPayList: React.VFC<Props> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [Sum, setSum] = useState(0);
  const [hasAdd, setAdd] = useState(false);
  // const router = useRouter();

  const handleChangeT = () => {
    setOpen(true);
  };

  const handleChangeF = () => {
    setOpen(false);
  };

  const [list, setList] = useState<any>([]);
  //支払い金額の取得

  //リストを取得
  const SettlementList = useCallback(async () => {
    try {
      const { data: settlementdata, error: settlementerror } = await client
        .from("Settlement_list")
        .select("*")
        .eq("projectId", props.project[2])
        .eq("id", props.id)
        .neq("payfor", props.id);
      if (settlementerror) {
        throw settlementerror;
      } else {
        if (settlementdata) {
          setList(settlementdata);

          const sumArray = (array: any) => {
            let sum = 0;
            for (let i = 0; i < settlementdata?.length; i++) {
              sum += array[i].money;
            }
            return sum;
          };
          setSum(sumArray(settlementdata));
        }
      }
    } catch (e) {
      alert(e);
    }
  }, [props.id, props.project]);

  useEffect(() => {
    SettlementList();
  }, [props, isOpen, Sum, hasAdd, SettlementList]);

  return (
    <>
      <div className="m-auto border-dashed border-b-2 sm:w-1/2">
        <div className="flex justify-between py-3 items-center">
          <div className="text-right">
            <UserNameModal
              project={props.project}
              id={props.id}
              nameid={props.nameid}
              setNameId={props.setNameId}
            >
              <p className="w-24">{props.project[3] || props.id}</p>
            </UserNameModal>
            <ModalComponent
              project={props.project}
              id={props.id}
              nameid={props.nameid}
              setAdd={setAdd}
              hasAdd={hasAdd}
              setCount={props.setCount}
            >
              支払
            </ModalComponent>
          </div>

          <div className=" flex text-3xl text-right mr-10">
            <div>{Sum}</div>
            {isOpen && list[0] ? (
              <ChevronUpIcon onClick={handleChangeF} />
            ) : (
              <ChevronDownIcon onClick={handleChangeT} />
            )}
          </div>
        </div>
        {isOpen && list[0] ? (
          <SettlementListItem list={list} nameid={props.nameid} />
        ) : null}
      </div>
    </>
  );
};
