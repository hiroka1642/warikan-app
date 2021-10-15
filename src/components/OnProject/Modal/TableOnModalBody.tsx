import { memo, useCallback, useEffect } from "react";
import { useSafeState, useUnmountRef } from "src/components/useUnmountRef";
import { client } from "src/libs/supabase";

type Props = {
  id: number;
  project: any;
};

//idごとの支払い履歴を表示する

// eslint-disable-next-line react/display-name
export const TableOnModalBody: React.VFC<Props> = memo((props) => {
  const unmountRef = useUnmountRef();

  const [list, setList] = useSafeState(unmountRef, []);
  //プロジェクトアイディーと、IDから支払ったリストを取得

  const GetList = useCallback(async () => {
    const { data, error } = await client
      .from("List_paid")
      .select("paid,money")
      .eq("project_id", props.project[2])
      .eq("id", props.id);

    if (error) {
      alert(error);
    } else {
      if (data) {
        setList(data);
      }
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
