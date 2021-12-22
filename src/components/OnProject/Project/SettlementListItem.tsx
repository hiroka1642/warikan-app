type Props = {
  list: string[];
  handleOpen: any;
};

export const SettlementListItem = (props: Props) => {
  return (
    <>
      {props.list.map((li: any, key) => {
        return (
          <tr key={key} className="text-base cursor-pointer hover:text-blue-500 " onClick={props.handleOpen} >
            <td className="px-3">{li.what}代</td>
            <td className="px-3">{li.money}円</td>
          </tr>
        );
      })}
    </>
  );
};
