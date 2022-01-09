import { useState } from "react";
import { Result } from "../Molecules/Result";
import { PaymentList } from "./PaymentList";

type Props = {
  project: any;
  nameArr: any;
};
export const PaymentResult = (props: Props) => {
  const [hasAdd, setAdd] = useState(false);

  return (
    <>
      <table className="mx-auto my-2 w-3/4">
        {props.nameArr.map((name: string, key: number) => {
          return (
            <Result
              project={props.project}
              name={name}
              key={key}
              id={key}
              nameArr={props.nameArr}
            />
          );
        })}
      </table>

      <ul className=" bg-white bg-opacity-30 py-2">
        {props.nameArr.map((i: any, key: any) => {
          return (
            <PaymentList
              project={props.project}
              id={key}
              name={i}
              key={key}
              nameArr={props.nameArr}
              hasAdd={hasAdd}
              setAdd={setAdd}
            />
          );
        })}
      </ul>
    </>
  );
};
