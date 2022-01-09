import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ProjectTypes } from "../../../types";
import { PaymentForEachUser } from "./PaymentForEachUser";
import { client } from "../../../libs/supabase";
import { Button } from "@chakra-ui/button";

type Props = {
  project: ProjectTypes;
  name: string;
  id: number;
  nameid: string[];
  hasAdd: boolean;
  setAdd: Dispatch<SetStateAction<boolean>>;
  setNameId: Dispatch<SetStateAction<string[]>>;
};

export const PaymentList: React.VFC<Props> = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [Sum, setSum] = useState(0);
  const [list, setList] = useState<any>([]);

  const handleChangeT = () => {
    setOpen(true);
  };

  const handleChangeF = () => {
    setOpen(false);
  };

  //リストを取得
  const SettlementList = useCallback(async () => {
    try {
      const { data: settlementdata, error: settlementerror } = await client
        .from("SettlementList")
        .select("*")
        .eq("projectId", props.project.projectId)
        .eq("id", props.id)
        .neq("payer", props.id);
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
    if (props.project) {
      SettlementList();
    }
  }, [props, isOpen, Sum, props.hasAdd, SettlementList]);

  return (
    <>
      <div className="m-auto border-dashed border-b-2 sm:w-1/2">
        <div className="flex justify-between py-3 items-center">
          {/* <div className="text-right">
            <UserNameModal
              id={props.id}
              nameid={props.nameid}
              setNameId={props.setNameId}
              name={props.name}
            />

            <ModalComponent
              project={props.project}
              id={props.id}
              nameid={props.nameid}
              setAdd={props.setAdd}
              hasAdd={props.hasAdd}
            >
              支払
            </ModalComponent>
          </div> */}

          <div className=" flex text-3xl text-right mr-10 ">
            <div>{Sum}</div>
            <div className="h-5 w-5">
              {list[0] ? (
                isOpen ? (
                  <Button
                    fontSize="20px"
                    padding="0"
                    marginLeft="10px"
                    borderRadius="50%"
                    onClick={handleChangeF}
                    variant="ghost"
                  >
                    <ChevronUpIcon />
                  </Button>
                ) : (
                  <Button
                    fontSize="20px"
                    padding="0"
                    marginLeft="10px"
                    borderRadius="50%"
                    onClick={handleChangeT}
                    variant="ghost"
                  >
                    <ChevronDownIcon />
                  </Button>
                )
              ) : null}
            </div>
          </div>
        </div>
        {isOpen ? (
          <>
            <PaymentForEachUser list={list} nameid={props.nameid} />
          </>
        ) : null}
      </div>
    </>
  );
};
