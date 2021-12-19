import { Checkbox } from "@chakra-ui/react";
import { useCallback, memo, useMemo } from "react";
import type { Dispatch, SetStateAction } from "react";
import { InputComponent } from "../../Atom/Input";
import type { ProjectTypes } from "src/types";

type Props = {
  project: ProjectTypes;
  value: string;
  setInputvalue: Dispatch<SetStateAction<string>>;
  moneyvalue: number;
  setMoneyValue: Dispatch<SetStateAction<number>>;
  checkedItems: boolean[];
  setCheckedItems: Dispatch<SetStateAction<boolean[]>>;
  nameid: string[];
};

// eslint-disable-next-line react/display-name
export const AddPayment: React.VFC<Props> = memo((props) => {
  const arr = useMemo(() => {
    return [...props.checkedItems];
  }, [props.checkedItems]);

  //member=[0,1,2,3,4,5...]
  const member = useMemo(() => {
    return [...Array(props.project.numberOfPeople)].map((_, i) => {
      return i;
    });
  }, [props]);

  const handleChange = useCallback(
    (e: any, li: any) => {
      arr.splice(li, 1, e.target.checked);
      props.setCheckedItems(() => {
        return [...arr];
      });
    },
    [arr, props]
  );

  return (
    <>
      <InputComponent value={props.value} setInputvalue={props.setInputvalue}>
        使用先
      </InputComponent>
      <InputComponent
        value={props.moneyvalue}
        setInputvalue={props.setMoneyValue}
      >
        金額
      </InputComponent>
      <div className="flex flex-col p-3">
        {member.map((li, key) => {
          return (
            <Checkbox
              key={key}
              value={li}
              isChecked={props.checkedItems[li]}
              // eslint-disable-next-line react/jsx-handler-names
              onChange={(e) => {
                return handleChange(e, li);
              }}
            >
              <p className="text-xl hover:text-green-800 p-1 font-bold">
                {props.nameid[li]}
              </p>
            </Checkbox>
          );
        })}
      </div>
    </>
  );
});
