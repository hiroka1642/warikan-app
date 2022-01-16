import { useCallback, useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { ProjectTypes, SettlementListTypes } from "../../types";
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
        <div className="mt-4 font-bold">
          <div className="whitespace-nowrap text-left min-w-[150px] p-2 text-lg bg-gray-50 rounded-xl">
            {props.nameArr[props.id]}
          </div>

          <table className="table z-0 table-compact w-full">
            {props.nameArr.map((_, key) => {
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
                return (
                  <tbody>
                    {UserList.length !== 0
                      ? UserList?.map((li: SettlementListTypes) => {
                          return (
                            <tr key={li.id} className="text-red-500">
                              <td className="w-80">
                                <span className="inline-block px-2">→</span>
                                {li.payer ? props.nameArr[li.payer] : null}
                              </td>
                              <td className="w-80">{li.what}代</td>
                              <td className="pr-4 text-right">{li.money}円</td>
                            </tr>
                          );
                        })
                      : null}

                    {GiveMeUserList.length !== 0
                      ? GiveMeUserList?.map((li: SettlementListTypes) => {
                          return (
                            <tr key={li.id} className="text-blue-500">
                              <td className="w-80">
                                <span className="inline-block px-2">←</span>
                                {props.nameArr[li.id]}
                              </td>
                              <td className="w-80">{li.what}代</td>
                              <td className="pr-4 text-right">{li.money}円</td>
                            </tr>
                          );
                        })
                      : null}
                  </tbody>
                );
              }
            })}
          </table>
        </div>
      )}
    </>
  );
};
