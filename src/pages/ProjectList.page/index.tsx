import { Layout } from "src/components/Atom/Layout";
import { Title } from "src/components/Atom/Title";
import { Projects } from "src/components/ProjectList";
import { Header } from "../../components/Templates/Header";

const ProjectPage: React.VFC = () => {
  return (
    <>
      <Header />
      <Layout>
        <Title>グループ一覧</Title>
        <Projects />
      </Layout>
    </>
  );
};

export default ProjectPage;
