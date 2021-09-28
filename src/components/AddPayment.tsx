import { InputComponent } from "./Input";

export const AddPayment = (props) => {
  return (
    <>
      <InputComponent value={props.value} setInputvalue={props.setInputvalue}>使用先</InputComponent>に
      <InputComponent value={props.moneyvalue} setInputvalue={props.setMoneyValue}>金額</InputComponent>円
      <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
      </ul>
    </>
  );
};
