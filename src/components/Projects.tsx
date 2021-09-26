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
  const [project, setProject] = useState<string>("");

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
          items.push(Project_name[i].propject_name);
        }

        props.setList([...items]);
      }
    }
  }, [props]);

  useEffect(() => {
    ProjectList();
  }, [ProjectList]);

  const handleClick = (li: any) => {
    setProject(li.target.value);
    setOnProject(true);
  };

  return (
    <>
      {isProject ? (
        <OnProject project={project} />
      ) : (
        <div className="p-24 text-center ">
          <h2 className="text-2xl">チーム一覧</h2>
          <ul className="w-96 mx-auto my-10  ">
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
                    value={li}
                    onClick={handleClick}
                  >
                    {li}
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
