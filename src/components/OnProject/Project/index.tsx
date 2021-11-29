import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent } from "../../Atom/button";
import type { ProjectTypes } from "../../../types";
import { useEffect, useState } from "react";
import { NeedPayList } from "src/components/OnProject/Project/PaymentList";
import { Box } from "@chakra-ui/layout";

export const Project: React.VFC = () => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectTypes>({
    projectName: "",
    numberOfPeople: 0,
    projectId: 0,
    userNameList: [],
  });
  const [nameid, setNameId] = useState<string[]>([]);

  //idから、プロジェクト情報を読み込む
  const ProjectList = useCallback(async () => {
    try {
      //プロジェクトアイディーに等しいproject_nameを取り出す
      const { data: Project_name, error } = await client
        .from("Project_name")
        .select("*")
        .eq("project_id", router.query.input);
      if (Project_name) {
        setProject({
          projectName: Project_name[0].propject_name,
          numberOfPeople: Project_name[0].member,
          projectId: Project_name[0].project_id,
          userNameList: Project_name[0].Username,
        });
        setNameId(Project_name[0].Username);
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [count, setCount] = useState(0);

  //IDをもとに名前を作成

  const handleDelete = async () => {
    const { error: project_name_error } = await client
      .from("Project_name")
      .delete()
      .eq("project_id", project.projectId);

    const { error: List_paid_error } = await client
      .from("List_paid")
      .delete()
      .eq("project_id", project.projectId);

    const { error: Settlement_list_error } = await client
      .from("Settlement_list")
      .delete()
      .eq("projectId", project.projectId);

    if (project_name_error || List_paid_error || Settlement_list_error) {
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
      <Box
        backgroundImage="url(.//AfterLoginBackgroundImage.jpg)"
        backgroundSize="cover"
        backgroundColor="rgba(255,255,255,0.3)"
        backgroundBlendMode="lighten"
      >
        <div className=" pt-16 sm:pt-40 h-screen">
          <p className="text-4xl text-center p-4">{project.projectName}</p>

          <ul className=" m-auto bg-white bg-opacity-30 ">
            {membername.map((i, key) => {
              return (
                <NeedPayList
                  project={project}
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
      </Box>
    </>
  );
};
