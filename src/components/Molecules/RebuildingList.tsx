import { memo, useCallback, useEffect, useState } from "react";
import { client } from "../../libs/supabase";

type Props = {
  project: any;
  nameArr: string[];
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
      <table className="table-compact  text-gray-600 w-full text-justify m-auto font-bold">
        <thead className="bg-gray-50 rounded-xl">
          <tr>
            <th className="w-1/3">科目</th>
            <th className="w-1/3">支払い者</th>
            <th className="w-1/3">金額</th>
          </tr>
        </thead>

        <tbody>
          {list.map((li: any, key: any) => {
            return (
              <tr key={key}>
                <td className="w-1/3">{li.what}代</td>
                <td className="w-1/3">{props.nameArr[li.id]}さん</td>
                <td className="w-1/3">{li.money}円</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
});
