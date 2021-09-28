import { useCallback, useEffect, useState } from "react";
import { client } from "src/libs/supabase";

type Props = {
  id: number;
  project: any;
};

//idごとの支払い履歴を表示する

export const TableOnModalBody = (props: Props) => {
  const [list, setList] = useState([]);
  //プロジェクトアイディーと、IDから支払ったリストを取得

  const GetList = useCallback(async () => {
    let { data, error } = await client
      .from("List_paid")
      .select("paid,money")
      .eq("project_id", props.project[2])
      .eq("id", props.id);

    if (error) {
      alert(error);
    } else {
      if (data) {
        setList(data);
        // console.log(list);

        //   console.log(list[0].paid);
        // console.log(data);
      }
    }
  }, [list]);

  useEffect(() => {
    GetList();
  }, [list]);

  return (
    <>
      <table className="text-xl w-64">
        <tbody>
          {list.map((li) => {
            return (
              <tr>
                <td>{li.paid}</td>
                <td>{li.money}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
