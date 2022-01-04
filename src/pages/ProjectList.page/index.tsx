import { useRouter } from "next/dist/client/router";
import { useCallback } from "react";
import { ButtonComponent } from "src/components/Atom/button";
import { Layout } from "src/components/Atom/Layout";
import { Title } from "src/components/Atom/Title";
import { ProjectList } from "src/components/ProjectList";
import { Header } from "../../components/Templates/Header";

const ProjectPage: React.VFC = () => {
  const router = useRouter();

  const handleNewProjectPage = useCallback(() => {
    router.push("/NewProject");
  }, [router]);
  return (
    <>
      <Header />
      <Layout>
        <Title>グループ一覧</Title>
        <ProjectList />
        <ButtonComponent className="w-1/3" onClick={handleNewProjectPage}>
          新規グループ作成
        </ButtonComponent>
      </Layout>
    </>
  );
};

export default ProjectPage;
