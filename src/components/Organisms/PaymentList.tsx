import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ProjectTypes } from "../../types";
import { client } from "../../libs/supabase";

type Props = {
  project: ProjectTypes;
  name: string;
  id: number;
  nameArr: string[];
  hasAdd: boolean;
  setAdd: Dispatch<SetStateAction<boolean>>;
};

//1人ずつの支払い
export const PaymentList = (props: Props) => {
  const [Sum, setSum] = useState(0);
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
  }, [props, Sum, props.hasAdd, SettlementList]);

  return (
    <>
      {list.length === 0 && giveMelist.length === 0 ? null : (
        <div className="flex border-b-2 border-dashed">
          <div className=" whitespace-nowrap w-1/3 text-justify">
            {props.nameArr[props.id]}
          </div>
          <table className="text-base w-full text-justify ">
            <tbody>
              {props.nameArr.map((_, key) => {
                const UserList = list.filter((item: any) => {
                  return item.payer === key;
                });
                const GiveMeUserList = giveMelist.filter((item: any) => {
                  return item.id === key;
                });
                if (UserList.length === 0 && GiveMeUserList.length === 0) {
                  return;
                } else {
                  return (
                    <>
                      {UserList?.map((li: any, key: number) => {
                        return (
                          <>
                            <tr key={key} className="text-red-500">
                              <td>→</td>
                              <td className="w-1/3">
                                {props.nameArr[li.payer]}
                              </td>
                              <td className="w-1/3">{li.what}代</td>
                              <td className="w-1/3">{li.money}円</td>
                            </tr>
                          </>
                        );
                      })}

                      {GiveMeUserList?.map((li: any, key: number) => {
                        return (
                          <tr key={key} className="text-blue-500">
                            <td>←</td>
                            <td className="w-1/3">{props.nameArr[li.id]}</td>
                            <td className="w-1/3">{li.what}代</td>
                            <td className="w-1/3">{li.money}円</td>
                          </tr>
                        );
                      })}
                    </>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
