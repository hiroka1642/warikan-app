import { Header } from "src/components/Templates/Header";
import { Layout } from "src/components/Atom/Layout";
import { Project } from "../../../components/OnProject/Project";
import { Title } from "src/components/Atom/Title";
import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import type { ProjectTypes } from "src/types";
import { client } from "src/libs/supabase";
import { AddPaymentModal } from "src/components/Templates/AddPaymentModal";
import { GrayButtonComponent } from "src/components/Atom/button";
import { PaymentTabs } from "src/components/Templates/PaymentTabs";

const OnProjectPage = () => {
  const router = useRouter();
  const [project, setProject] = useState<ProjectTypes>({
    projectName: "",
    numberOfPeople: 0,
    projectId: 0,
    userNameList: [],
  });
  const [nameid, setNameId] = useState<string[]>([]);

  //idから、プロジェクト情報を読み込む
  const ProjectList = useCallback(async () => {
    try {
      //プロジェクトアイディーに等しいproject_nameを取り出す
      const { data: Projects, error } = await client
        .from("Projects")
        .select("*")
        .eq("projectId", router.query.id);
      if (Projects) {
        setProject({
          projectName: Projects[0].projectName,
          numberOfPeople: Projects[0].member,
          projectId: Projects[0].projectId,
          userNameList: Projects[0].userName,
        });
        setNameId(Projects[0].userName);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  }, [router.query.id]);

  useEffect(() => {
    ProjectList();
  }, [ProjectList]);

  const handleEditNamePage = () => {
    router.push(`/EditName.page/${router.query.id}`);
  };

  return (
    <>
      <Header />
      <Layout>
        <Title>{project.projectName}</Title>
        <AddPaymentModal project={project} nameid={nameid}>
          たてかえを追加
        </AddPaymentModal>
        <GrayButtonComponent onClick={handleEditNamePage} className="w-full">
          メンバーを編集する
        </GrayButtonComponent>
        <PaymentTabs project={project} nameid={nameid} />

        <Project project={project} nameid={nameid} setNameId={setNameId} />
      </Layout>
    </>
  );
};

export default OnProjectPage;