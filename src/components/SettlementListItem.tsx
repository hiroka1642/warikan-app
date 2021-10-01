export const SettlementListItem = (props) => {
  return (
    <>
      <table className="text-xl w-64">
        {props.list.map((li) => {
          return (
            <tr key={li.id}>
              <td>{li.what}</td>
              <td>{li.payfor}さんへ</td>
              <td>{li.money}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
};
