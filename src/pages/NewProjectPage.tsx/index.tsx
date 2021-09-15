import { useEffect } from "react";
import { Header } from "../components/Header";
import { NewProject } from "../components/NewProject";

const NewProjectPage = () => {
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
      <NewProject />
    </>
  );
};

export default NewProjectPage;
