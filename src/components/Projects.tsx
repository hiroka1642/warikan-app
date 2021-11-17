import { Box } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";

import { useCallback } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent } from "./Atom/button";
import { Project } from "./Project";

type Props = {
  setList: Dispatch<SetStateAction<string[]>>;
  list: string[];
};

export const Projects: React.VFC<Props> = (props) => {
  const [isOnProject, setOnProject] = useState<boolean>(false);
  const [project, setProject] = useState<string[]>([]);
  const router = useRouter();

  const handleNewProjectPage = useCallback(() => {
    router.push("/NewProject");
  }, []);

  //リストを取得する
  const ProjectList = useCallback(async () => {
    try {
      const { data: Project_name, error } = await client
        .from("Project_name")
        .select("*");
      if (Project_name) {
        const items: any = [];
        for (let i = 0; i < Project_name.length; i++) {
          items.push({
            name: Project_name[i].propject_name,
            member: Project_name[i].member,
            id: Project_name[i].project_id,
          });
        }
        props.setList([...items]);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  }, [props]);

  useEffect(() => {
    ProjectList();
  }, [project, ProjectList]);

  const handleClick = async (li: any) => {
    try {
      //プロジェクトアイディーに等しいproject_nameを取り出す
      const { data: Project_name, error } = await client
        .from("Project_name")
        .select("*")
        .eq("project_id", li.target.value);
      if (Project_name) {
        setProject({
          projectName: Project_name[0].propject_name,
          NumberOfPeople: Project_name[0].member,
          projectId: Project_name[0].project_id,
          userNameList: Project_name[0].Username,
        });
        setOnProject(true);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  };

  return (
    <>
      {isOnProject ? (
        <Project project={project} setOnProject={setOnProject} />
      ) : (
        <div className=" text-center m-auto  px-3 pt-12 sm:pt-52 ">
          <h2 className="text-2xl">チーム一覧</h2>
          <ul className=" mx-auto max-w-xl my-10  ">
            {props.list?.map((li: any, key: any) => {
              return (
                <li className="text-xl my-4" key={key}>
                  <Box
                    as="button"
                    borderRadius="md"
                    border="2px"
                    borderColor="skyblue"
                    bg="white"
                    color="gray"
                    w="full"
                    h={14}
                    textAlign="left"
                    paddingLeft={3}
                    value={li.id}
                    onClick={handleClick}
                  >
                    {li.name}
                  </Box>
                </li>
              );
            })}
          </ul>
          <ButtonComponent color="red" onClick={handleNewProjectPage}>
            新規プロジェクト
          </ButtonComponent>
        </div>
      )}
    </>
  );
};