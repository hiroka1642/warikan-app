import { Box } from "@chakra-ui/react";
import { useState } from "react";
import { Projects } from "src/pages/ProjectList.page/Projects";
import { Header } from "../../components/Header";

const ProjectPage: React.VFC = () => {
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
          <Header />
          <Projects list={list} setList={setList} />
        </div>
      </Box>
    </>
  );
};

export default ProjectPage;
