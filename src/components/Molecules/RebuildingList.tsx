import { memo, useCallback, useEffect, useState } from "react";
import { client } from "../../libs/supabase";

type Props = {
  project: any;
  nameid: string[];
};

// eslint-disable-next-line react/display-name
export const RebuildingList: React.VFC<Props> = memo((props) => {
  const [list, setList] = useState<string[]>([]);

  const GetList = useCallback(async () => {
    try {
      const { data, error } = await client
        .from("PaymentList")
        .select("what,money,id")
        .eq("projectId", props.project.projectId);
      if (error) {
        throw error;
      }
      if (data) {
        setList(data);
      }
    } catch (e) {
      alert(e);
    }
  }, [props.project, setList]);

  useEffect(() => {
    GetList();
  }, [GetList, list]);

  return (
    <>
      <table className="text-base text-justify w-full">
        <tbody>
          {list.map((li: any, key: any) => {
            return (
              <tr key={key}>
                <td>{li.what}代</td>
                <td>{props.nameid[li.id]}さん</td>
                <td>{li.money}円</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
});
