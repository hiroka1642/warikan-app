import { InputComponent } from "./Input";

type Props = {
  props: any;
};

export const AddPayment = (props: Props) => {
  const member = [...Array(props.project[1])].map((_, i) => i);
  //自分のidは配列から外したい
  // props.setSettleMember([1, 2, 3]);

  // let arr = [];

  return (
    <>
      <InputComponent value={props.value} setInputvalue={props.setInputvalue}>
        使用先
      </InputComponent>
      に
      <InputComponent
        value={props.moneyvalue}
        setInputvalue={props.setMoneyValue}
      >
        金額
      </InputComponent>
      円
      <ul>
        {member.map((li) => {
          return (
            <li key={li}>
              <button onClick={() => props.handleSettleMember(li)}>{li}</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
