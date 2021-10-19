type Props = {
  list: string[];
  nameid: Element[];
};

export const SettlementListItem: React.VFC<Props> = (props) => {
  return (
    <>
      <table className="text-xl  m-auto ">
        <tbody className="px-4">
          {props.list.map((li: any, key) => {
            return (
              <tr key={key} className="px-4">
                <td>{li.what}代</td>
                <td>{props.nameid[li.payfor] || li.payfor}へ</td>
                <td>{li.money}円</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
