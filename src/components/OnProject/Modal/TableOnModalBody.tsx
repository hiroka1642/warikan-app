import { memo, useCallback, useEffect, useState } from "react";
import { client } from "src/libs/supabase";

type Props = {
  id: number;
  project: any;
};

//idごとの支払い履歴を表示する

// eslint-disable-next-line react/display-name
export const TableOnModalBody: React.VFC<Props> = memo((props) => {
  const [list, setList] = useState<string[]>([]);
  //プロジェクトアイディーと、IDから支払ったリストを取得

  const GetList = useCallback(async () => {
    try {
      const { data, error } = await client
        .from("List_paid")
        .select("paid,money")
        .eq("project_id", props.project.projectId)
        .eq("id", props.id);
      if (error) {
        throw error;
      }
      if (data) {
        setList(data);
      }
    } catch (e) {
      alert(e);
    }
  }, [props.id, props.project, setList]);

  useEffect(() => {
    GetList();
  }, [GetList, list]);

  return (
    <>
      <table className="text-xl w-64">
        <tbody>
          {list.map((li: any, key: any) => {
            return (
              <tr key={key}>
                <td>{li.paid}</td>
                <td>{li.money}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
});
