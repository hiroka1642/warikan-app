import { useCallback, useEffect, useState } from "react";
import { client } from "src/libs/supabase";
import type { ProjectTypes, SettlementListTypes } from "src/types";
import { PaymentList } from "./PaymentList";

type Props = {
  project: ProjectTypes;
  nameArr: string[];
};
export const PaymentDetail = (props: Props) => {
  const [hasAdd, setAdd] = useState(false);
  const [Sum, setSum] = useState(0);
  const [list, setList] = useState<SettlementListTypes[]>([]);

  //自分が払うリストを取得
  const SettlementList = useCallback(async () => {
    try {
      const { data: settlementdata, error: settlementerror } = await client
        .from("SettlementList")
        .select("*")
        .eq("projectId", props.project.projectId);
      if (settlementerror) {
        throw settlementerror;
      } else {
        if (settlementdata) {
          setList(settlementdata);

          const sumArray = (array: SettlementListTypes[]) => {
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
  }, [props.project.projectId]);

  useEffect(() => {
    if (props.project) {
      SettlementList();
    }
  }, [props, Sum, hasAdd, SettlementList]);

  return (
    <>
      {props.nameArr.map((i: string, key: number) => {
        return (
          <PaymentList
            project={props.project}
            id={key}
            name={i}
            key={key}
            list={list}
            nameArr={props.nameArr}
            hasAdd={hasAdd}
            setAdd={setAdd}
          />
        );
      })}
    </>
  );
};
