import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent } from "../Atom/button";
import { NeedPayList } from "../OnProject/NeedPayList";

type Props = {
  project: any[];
  setOnProject: Dispatch<SetStateAction<boolean>>;
};

export const OnProject: React.VFC<Props> = (props) => {
  const membername = [...Array(props.project[1])].map((_, i) => {
    return i;
  });
  const [nameid, setNameId] = useState(props.project[3]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  //IDをもとに名前を作成

  const handleDelete = async () => {
    const { error: project_name_error } = await client
      .from("Project_name")
      .delete()
      .eq("project_id", props.project[2]);

    const { error: List_paid_error } = await client
      .from("List_paid")
      .delete()
      .eq("project_id", props.project[2]);

    const { error: Settlement_list_error } = await client
      .from("Settlement_list")
      .delete()
      .eq("projectId", props.project[2]);

    if (project_name_error || List_paid_error || Settlement_list_error) {
      alert("エラーが発生しました");
    } else {
      props.setOnProject(false);
    }
  };
  const handleSetOnproject = () => {
    props.setOnProject(false);
  };

  return (
    <>
      <div className=" pt-16 sm:pt-40">
        <p className="text-4xl text-center p-4">{props.project[0]}</p>

        <ul className=" m-auto">
          {membername.map((i, key) => {
            return (
              <NeedPayList
                project={props.project}
                id={i}
                key={key}
                nameid={nameid}
                setNameId={setNameId}
                setCount={setCount}
                count={count}
              />
            );
          })}
        </ul>

        <div className="text-center mt-12 flex justify-center gap-4">
          <ButtonComponent onClick={handleDelete} color="red">
            削除
          </ButtonComponent>
          <ButtonComponent onClick={handleSetOnproject}>戻る</ButtonComponent>
        </div>
      </div>
    </>
  );
};
