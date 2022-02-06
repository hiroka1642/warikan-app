import { Header } from "src/components/Templates/Header";
import { Layout } from "src/components/Atom/Layout";
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
  const [nameArr, setNameArr] = useState<string[]>([]);

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
        setNameArr(Projects[0].userName);
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

  const handleDelete = async () => {
    const { error: project_name_error } = await client
      .from("Projects")
      .delete()
      .eq("projectId", project.projectId);

    const { error: PaymentList_error } = await client
      .from("PaymentList")
      .delete()
      .eq("projectId", project.projectId);

    const { error: SettlementList_error } = await client
      .from("SettlementList")
      .delete()
      .eq("projectId", project.projectId);

    if (project_name_error || PaymentList_error || SettlementList_error) {
      alert("エラーが発生しました");
    } else {
      router.push("/ProjectList.page");
    }
  };

  return (
    <>
      <Header />
      <Layout>
        <Title isBackButton>{project.projectName}</Title>

        <div className="flex">
          <AddPaymentModal project={project} nameArr={nameArr}>
            たてかえを追加
          </AddPaymentModal>

          <GrayButtonComponent
            onClick={handleEditNamePage}
            className="w-full rounded-lg mt-6"
          >
            メンバーを編集する
          </GrayButtonComponent>
        </div>

        <PaymentTabs project={project} nameArr={nameArr} />
        <div className="text-center mt-12 flex justify-center gap-4">
          <GrayButtonComponent onClick={handleDelete}>
            グループを削除
          </GrayButtonComponent>
        </div>
      </Layout>
    </>
  );
};

export default OnProjectPage;
