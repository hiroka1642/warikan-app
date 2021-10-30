import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Projects } from "src/components/NewProjectPage/Projects";
import { Header } from "../Header";
import { NewProject } from "./NewProject";

export const NewProjectPage: React.VFC = () => {
  const [hasNewProject, setNewProject] = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);

  return (
    <>
      <Box
        backgroundImage="url(.//AfterLoginBackgroundImage.jpg)"
        backgroundSize="cover"
        backgroundColor="rgba(255,255,255,0.3)"
        backgroundBlendMode="lighten"
      >
        {/* ？？h-100%ではダメなのか */}
        <div className="h-screen">
          <Header setNewProject={setNewProject} />
          {hasNewProject ? (
            <NewProject setNewProject={setNewProject} setList={setList} />
          ) : (
            <Projects
              setNewProject={setNewProject}
              list={list}
              setList={setList}
            />
          )}
        </div>
      </Box>
    </>
  );
};
