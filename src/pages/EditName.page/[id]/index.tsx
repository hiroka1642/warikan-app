import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react";
import { Layout } from "src/components/Atom/Layout";
import { Title } from "src/components/Atom/Title";
import { UserNameModal } from "src/components/Templates/UserNameModal";
import { client } from "src/libs/supabase";
import { Header } from "../../../components/Templates/Header";

const EditName: React.VFC = () => {
  const [memberName, setMemberName] = useState<string[]>([]);

  const router = useRouter();

  //idから、プロジェクト情報を読み込む
  const ReadMemberName = useCallback(async () => {
    try {
      //プロジェクトアイディーに等しいproject_nameを取り出す
      const { data: MemberName, error } = await client
        .from("Projects")
        .select("userName")
        .eq("projectId", router.query.id);
      if (MemberName) {
        setMemberName(MemberName[0].userName);
      }
      if (error) {
        throw error;
      }
    } catch (e) {
      alert(e);
    }
  }, [router.query.id]);

  useEffect(() => {
    ReadMemberName();
  }, [ReadMemberName]);

  return (
    <>
      <Header />
      <Layout>
        <Title isBackButton>メンバーを編集する</Title>
        <div>名前を変更したいメンバーを選択してください</div>
        {memberName?.map((member: string, key) => {
          return (
            <>
              <UserNameModal
                name={member}
                id={key}
                nameArr={memberName}
                setNameArr={setMemberName}
              />
            </>
          );
        })}
      </Layout>
    </>
  );
};

export default EditName;
