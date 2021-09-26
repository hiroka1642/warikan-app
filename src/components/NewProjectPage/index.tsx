import { useState } from "react";
import { useEffect } from "react";
import { Projects } from "src/components/Projects";
import { Header } from "../Header";
import { NewProject } from "../NewProject";

export const NewProjectPage = () => {
  const [newproject, setNewProject]: any = useState<boolean>(false);
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.backgroundImage =
      "url(.//AfterLoginBackgroundImage.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundColor = "rgba(255,255,255,0.3)";
    document.body.style.backgroundBlendMode = "lighten";
  }, []);
  return (
    <>
      <Header />
      {newproject ? (
        <NewProject setNewProject={setNewProject} setList={setList} />
      ) : (
        <Projects setNewProject={setNewProject} list={list} setList={setList} />
      )}
    </>
  );
};
