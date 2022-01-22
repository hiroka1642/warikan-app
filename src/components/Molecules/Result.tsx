import { useCallback, useEffect, useState } from "react";
import { client } from "src/libs/supabase";
import type { ProjectTypes, SettlementListTypes } from "src/types";

type Props = {
  project: ProjectTypes;
  nameArr: string[];
  name: string;
  id: number;
};

//一人あたりの結果_佐藤→田中_佐藤→鈴木
export const Result = (props: Props) => {
  const [list, setList] = useState<SettlementListTypes[]>([]);
  const [giveMelist, setGiveMeList] = useState<SettlementListTypes[]>([]);

  //自分が払うリストを取得
  const SettlementList = useCallback(async () => {
    try {
      const { data: settlementdata, error: settlementerror } = await client
        .from("SettlementList")
        .select("*")
        .eq("projectId", props.project.projectId)
        .eq("id", props.id)
        .neq("payer", props.id);
      const { data: giveMeData, error: giveMeError } = await client
        .from("SettlementList")
        .select("*")
        .eq("projectId", props.project.projectId)
        .eq("payer", props.id)
        .neq("id", props.id);

      if (settlementerror) {
        throw settlementerror;
      } else if (giveMeError) {
        throw giveMeError;
      } else {
        if (settlementdata) {
          setList(settlementdata);
        }
        if (giveMeData) {
          setGiveMeList(giveMeData);
        }
      }
    } catch (e) {
      alert(e);
    }
  }, [props.id, props.project.projectId]);

  useEffect(() => {
    if (props.project) {
      SettlementList();
    }
  }, [props, SettlementList]);

  return (
    <>
      {/* 相手が同じ場合は足し算する */}
      {props.nameArr.map((li: string, key: number) => {
        const UserList = list.filter((item: SettlementListTypes) => {
          return item.payer === key;
        });
        const GiveMeUserList = giveMelist.filter(
          (item: SettlementListTypes) => {
            return item.id === key;
          }
        );
        if (UserList.length === 0 && GiveMeUserList.length === 0) {
          return;
        } else {
          const sum = UserList.reduce(
            (sum: number, element: SettlementListTypes) => {
              return sum + element.money;
            },
            0
          );
          const GiveMeSum = GiveMeUserList.reduce(
            (sum: number, element: SettlementListTypes) => {
              return sum + element.money;
            },
            0
          );
          if (sum - GiveMeSum <= 0) {
            return;
          }

          if (sum - GiveMeSum > 0) {
            return (
              <tr key={key}>
                <td className="min-w-[150px]">{props.nameArr[props.id]}</td>
                <td className="w-1/3">
                  <span className="pr-2">→</span>
                  {li}
                </td>
                <td className="w-1/3">{sum - GiveMeSum}円</td>
              </tr>
            );
          }
        }
      })}
    </>
  );
};
