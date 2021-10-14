type Props = {
  list: string[];
  nameid: Element[];
};

export const SettlementListItem = (props: Props) => {
  return (
    <>
      <table className="text-xl  m-auto">
        {props.list.map((li: any) => {
          return (
            <tr key={li.id}>
              <td>{li.what}代</td>
              <td>{props.nameid[li.payfor] || li.payfor}へ</td>
              <td>{li.money}円</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
