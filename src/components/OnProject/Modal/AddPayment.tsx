import type{ Dispatch, SetStateAction } from "react";
import { InputComponent } from "../../Atom/Input";

type Props = {
  project: string[];
  value: string;
  setInputvalue: Dispatch<SetStateAction<string>>;
  moneyvalue: number;
  setMoneyValue: Dispatch<SetStateAction<number>>;
  handleSettleMember(li: number): void;
  nameid: Element[];
};

export const AddPayment = (props: Props) => {
  const member = [...Array(props.project[1])].map((_, i) => {
    return i;
  });

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

      <ul className="flex flex-col p-3">
        {member.map((li) => {
          return (
            <li key={li}>
              <button
                // eslint-disable-next-line arrow-body-style
                onClick={() => props.handleSettleMember(li)}
                className="text-xl hover:text-green-800 p-1 font-bold"
              >
                {props.nameid[li] || li}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
