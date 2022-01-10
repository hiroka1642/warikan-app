import { useCallback, useEffect, useState } from "react";
import { client } from "src/libs/supabase";

type Props = {
  project: any;
  nameArr: any;
  name: string;
  id: number;
};

export const Result = (props: Props) => {
  const [list, setList] = useState<any>([]);
  const [giveMelist, setGiveMeList] = useState<any>([]);

  //自分が払うリストを取得
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
        }
      }
    } catch (e) {
      alert(e);
    }
    //自分がもらうリストを取得
    try {
      const { data: giveMeData, error: giveMeError } = await client
        .from("SettlementList")
        .select("*")
        .eq("projectId", props.project.projectId)
        .eq("payer", props.id)
        .neq("id", props.id);
      if (giveMeError) {
        throw giveMeError;
      } else {
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
      {props.nameArr.map((li: any, key: number) => {
        const UserList = list.filter((item: any) => {
          return item.payer === key;
        });
        const GiveMeUserList = giveMelist.filter((item: any) => {
          return item.id === key;
        });
        if (UserList.length === 0 && GiveMeUserList.length === 0) {
          return;
        } else {
          let sum = 0;
          UserList?.map((li: any) => {
            return (sum += li.money);
          });
          let GiveMeSum = 0;
          GiveMeUserList?.map((li: any) => {
            return (GiveMeSum += li.money);
          });

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
