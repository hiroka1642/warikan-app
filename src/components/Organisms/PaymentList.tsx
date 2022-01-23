import type { Dispatch, SetStateAction } from "react";
import type { ProjectTypes, SettlementListTypes } from "../../types";

type Props = {
  project: ProjectTypes;
  name: string;
  id: number;
  nameArr: string[];
  hasAdd: boolean;
  list: SettlementListTypes[];
  setAdd: Dispatch<SetStateAction<boolean>>;
};

//1人ずつの支払い
export const PaymentList = (props: Props) => {
  return (
    <>
      {props.list.length === 0 ? null : (
        <div className="mt-4 font-bold">
          <div className="whitespace-nowrap text-left min-w-[150px] p-2 text-lg bg-gray-50 rounded-xl">
            {props.nameArr[props.id]}
          </div>

          <table className="table z-0 table-compact w-full">
            {props.nameArr.map((_, key) => {
              const UserList = props.list.filter(
                (item: SettlementListTypes) => {
                  return item.payer === key && item.id === props.id;
                }
              );
              const GiveMeUserList = props.list.filter(
                (item: SettlementListTypes) => {
                  return item.id === key && item.payer === props.id;
                }
              );

              if (UserList.length === 0) {
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
                                {li.payer !== null
                                  ? props.nameArr[li.payer] || li.payer
                                  : null}
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
