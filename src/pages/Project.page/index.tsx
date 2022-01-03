import { Header } from "src/components/Templates/Header";
import { Layout } from "src/components/Atom/Layout";
import { Project } from "../../components/OnProject/Project";

const OnProjectPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <Project />
      </Layout>
    </>
  );
};

export default OnProjectPage;
