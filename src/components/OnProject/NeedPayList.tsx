import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { client } from "src/libs/supabase";
import { ModalComponent } from "./Modal";
import { SettlementListItem } from "./SettlementListItem";
import { UserNameModal } from "../OnProject/UserNameModal";

type Props = {
  project: string[];
  id: number;
  nameid: Element[];
  setCount: Dispatch<SetStateAction<number>>;
  setNameId: Dispatch<SetStateAction<number>>;
  count: number;
};

export const NeedPayList: React.VFC<Props> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [Sum, setSum] = useState(0);
  const [hasAdd, setAdd] = useState(false);

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
    const { data: settlementdata, error: settlementerror } = await client
      .from("Settlement_list")
      .select("*")
      .eq("projectId", props.project[2])
      .eq("id", props.id)
      .neq("payfor", props.id);
    if (settlementerror) {
      alert(settlementerror);
    } else {
      if (settlementdata) {
        const { data: projectdata, error: projecterror } = await client
          .from("Project_name")
          .select("Username")
          .eq("project_id", props.project[2]);
        if (projecterror) {
          alert("error");
        } else {
          if (projectdata) {
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
      }
    }
  }, [props.id, props.project]);

  useEffect(() => {
    SettlementList();
  }, [props, isOpen, Sum, hasAdd, SettlementList]);

  return (
    <>
      <div className="text-right ">
        <div className="flex justify-center py-1 ">
          <div className="flex">
            {/* <div className="text-2xl text-left w-32">
              {props.project[3][props.id] || props.id}
            </div> */}
            <UserNameModal
              project={props.project}
              id={props.id}
              nameid={props.nameid}
              setNameId={props.setNameId}
            >
              <p className="w-32">
                {/* {props.project[3][props.id] || props.id} */}
                {props.nameid[props.id] || props.id}
              </p>
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
          <div className="text-2xl w-32">{Sum}</div>
          {isOpen ? (
            <ChevronUpIcon className="text-3xl" onClick={handleChangeF} />
          ) : (
            <ChevronDownIcon className="text-3xl" onClick={handleChangeT} />
          )}
        </div>
        {isOpen ? (
          <SettlementListItem list={list} nameid={props.nameid} />
        ) : null}
      </div>
    </>
  );
};
