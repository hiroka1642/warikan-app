import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { client } from "src/libs/supabase";
import { ButtonComponent } from "./button";
import { OnProject } from "./OnProject";

type Props = {
  setNewProject: any;
  setList: any;
  list: any;
};

export const Projects = (props: Props) => {
  const [isProject, setOnProject] = useState<boolean>(false);
  const [project, setProject] = useState<string[]>([]);

  const handleProject = useCallback(() => {
    props.setNewProject(true);
  }, [props]);

  const ProjectList = useCallback(async () => {
    const { data: Project_name, error } = await client
      .from("Project_name")
      .select("*");

    if (error) {
      alert(error);
    } else {
      if (Project_name) {
        const items = [];
        for (let i = 0; i < Project_name.length; i++) {
          items.push({
            name: Project_name[i].propject_name,
            member: Project_name[i].member,
            id: Project_name[i].project_id,
          });
        }

        props.setList([...items]);
      }
    }
  }, []);

  useEffect(() => {
    ProjectList();
  }, [project, isProject]);

  const handleClick = async (li: any) => {
    //プロジェクトアイディーに等しいproject_nameを取り出す
    const { data: Project_name, error } = await client
      .from("Project_name")
      .select("*")
      .eq("project_id", li.target.value);

    if (error) {
      alert(error);
    } else {
      if (Project_name) {
        setProject([
          Project_name[0].propject_name,
          Project_name[0].member,
          Project_name[0].project_id,
        ]);
        setOnProject(true);
      }
    }
  };

  const setonProject = () => {
    setOnProject(false);
  };

  return (
    <>
      {isProject ? (
        <OnProject project={project} setOnProject={setonProject} />
      ) : (
        <div className="p-24 text-center ">
          <h2 className="text-2xl">チーム一覧</h2>
          <ul className=" mx-auto max-w-xl my-10  ">
            {props.list?.map((li: any, key: any) => {
              return (
                <li className="text-xl my-4" key={key}>
                  <Box
                    as="button"
                    borderRadius="md"
                    border="2px"
                    borderColor="green"
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
          <ButtonComponent color="red" onClick={handleProject}>
            新規プロジェクト
          </ButtonComponent>
        </div>
      )}
    </>
  );
};
