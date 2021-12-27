import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import { ButtonComponent } from "../../Atom/button";
import type { ProjectTypes } from "../../../types";
import { useEffect, useState } from "react";
import { PaymentList } from "./PaymentList";
import { client } from "../../../libs/supabase";

export const Project: React.VFC = () => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectTypes>({
    projectName: "",
    numberOfPeople: 0,
    projectId: 0,
    userNameList: [],
  });
  const [nameid, setNameId] = useState<string[]>([]);
  const [hasAdd, setAdd] = useState(false);

  //idから、プロジェクト情報を読み込む
  const ProjectList = useCallback(async () => {
    try {
      //プロジェクトアイディーに等しいproject_nameを取り出す
      const { data: Projects, error } = await client
        .from("Projects")
        .select("*")
        .eq("projectId", router.query.input);
      if (Projects) {
        setProject({
          projectName: Projects[0].projectName,
          numberOfPeople: Projects[0].member,
          projectId: Projects[0].projectId,
          userNameList: Projects[0].userName,
        });
        setNameId(Projects[0].userName);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  }, [router.query.input]);

  useEffect(() => {
    ProjectList();
  }, [ProjectList]);

  const membername = [...Array(project.numberOfPeople)].map((_, i) => {
    return i;
  });


  //IDをもとに名前を作成

  const handleDelete = async () => {
    const { error: project_name_error } = await client
      .from("Projects")
      .delete()
      .eq("projectId", project.projectId);

    const { error: PaymentList_error } = await client
      .from("PaymentList")
      .delete()
      .eq("projectId", project.projectId);

    const { error: SettlementList_error } = await client
      .from("SettlementList")
      .delete()
      .eq("projectId", project.projectId);

    if (project_name_error || PaymentList_error || SettlementList_error) {
      alert("エラーが発生しました");
    } else {
      router.push("/ProjectList.page");
    }
  };
  const handleSetOnproject = () => {
    router.push("/ProjectList.page");
  };

  return (
    <>
      <div className=" pt-16 sm:pt-40 ">
        <p className="text-4xl text-center p-4">{project.projectName}</p>

        <ul className=" m-auto bg-white bg-opacity-30 ">
          {membername.map((i, key) => {
            return (
              <PaymentList
                project={project}
                id={i}
                key={key}
                nameid={nameid}
                setNameId={setNameId}
                hasAdd={hasAdd}
                setAdd={setAdd}
              />
            );
          })}
        </ul>

        <div className="text-center mt-12 flex justify-center gap-4">
          <ButtonComponent onClick={handleDelete} color="red">
            削除
          </ButtonComponent>
          <ButtonComponent onClick={handleSetOnproject} color="blue">
            戻る
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};
