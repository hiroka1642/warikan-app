import { useCallback, memo, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { InputComponent } from "../../Atom/Input";
import type { ProjectTypes } from "src/types";
import { InputNumber } from "@supabase/ui";
import { SelectBox } from "src/components/Atom/SelectBox";

type Props = {
  project: ProjectTypes;
  value: string;
  setInputvalue: Dispatch<SetStateAction<string>>;
  moneyvalue: number | null;
  setMoneyValue: Dispatch<SetStateAction<number | null>>;
  checkedItems: boolean[];
  setCheckedItems: Dispatch<SetStateAction<boolean[]>>;
  nameid: string[];
  member: any;
  setMemberValue: any;
};

// eslint-disable-next-line react/display-name
export const AddPayment: React.VFC<Props> = memo((props) => {
  const arr = useMemo(() => {
    return [...props.checkedItems];
  }, [props.checkedItems]);

  const handleChange = useCallback(
    (e: any, li: any) => {
      arr.splice(li, 1, e.target.checked);
      props.setCheckedItems(() => {
        return [...arr];
      });
    },
    [arr, props]
  );

  const handleChangeInputValue = (e: any) => {
    props.setInputvalue(e.target.value);
  };

  const handleChangeMoneyValue = (e: any) => {
    props.setMoneyValue(e.target.value);
  };

  return (
    <>
      <div>
        <div className="flex whitespace-nowrap flex-col items-end w-full gap-1">
          <div className="flex items-center w-full">
            <SelectBox
              className="w-3/4"
              value={props.member}
              // eslint-disable-next-line react/jsx-handler-names
              onChange={props.setMemberValue}
              items={props.project.userNameList}
            />
            <div className="mx-3">が</div>
          </div>
          <div className="flex items-center w-full">
            <InputComponent
              className="w-3/4"
              value={props.value}
              onChange={handleChangeInputValue}
              placeholder="使用先を追加してください"
            />
            <div className="mx-3">代を</div>
          </div>
          <div className="flex items-center w-full ">
            <InputNumber
              className="w-full shadow-none"
              placeholder="金額を入力してください"
              value={props.moneyvalue}
              onChange={handleChangeMoneyValue}
            />
            <div className="mx-3">円たてかえ</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-3">
        <p>Members</p>
        {props.project.userNameList.map((li, key) => {
          return (
            <label className="inline-flex items-center w-max" key={key}>
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={props.checkedItems[key]}
                // eslint-disable-next-line react/jsx-handler-names
                onChange={(e) => {
                  return handleChange(e, key);
                }}
              />
              <span className="ml-2 text-gray-700 text-xl hover:text-indigo-700 p-1 font-bold">
                {li}
              </span>
            </label>
          );
        })}
      </div>
    </>
  );
});
