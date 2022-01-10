import { Result } from "../Molecules/Result";

type Props = {
  project: any;
  nameArr: any;
};
export const PaymentResult = (props: Props) => {
  return (
    <div>
      <table className="table table-compact w-full font-bold text-gray-600">
        <thead>
          <tr>
            <th >
              誰から
            </th>
            <th >
              誰に
            </th>
            <th >
              金額
            </th>
          </tr>
        </thead>
      <tbody>
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
        </tbody>
      </table>
    </div>
  );
};
