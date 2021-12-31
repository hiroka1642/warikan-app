import { Layout } from "src/components/Atom/Layout";
import { Projects } from "src/components/ProjectList";
import { Header } from "../../components/Templates/Header";

const ProjectPage: React.VFC = () => {

  return (
    <>
      <Layout>
        <Header />
        <Projects  />
      </Layout>
    </>
  );
};

export default ProjectPage;
