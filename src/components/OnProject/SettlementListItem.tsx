type Props = {
  list: string[];
  nameid: Element[];
};

export const SettlementListItem: React.VFC<Props> = (props) => {
  return (
    <>
      <div className="text-right">
        <table className="text-xl text-right inline-block mr-14">
          <tbody>
            {props.list.map((li: any, key) => {
              return (
                <tr key={key}>
                  <td className="px-3">{li.what}代</td>
                  <td className="px-3">
                    {props.nameid[li.payfor] || li.payfor}へ
                  </td>
                  <td className="px-3">{li.money}円</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
