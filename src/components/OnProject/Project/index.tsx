import { useRouter } from "next/dist/client/router";
import { ButtonComponent } from "../../Atom/button";
import { useState } from "react";
import { PaymentList } from "./PaymentList";
import { client } from "../../../libs/supabase";

type Props = {
  project: any;
  nameid: any;
  setNameId: any;
};
export const Project = (props: Props) => {
  const router = useRouter();
  const [hasAdd, setAdd] = useState(false);

  const handleDelete = async () => {
    const { error: project_name_error } = await client
      .from("Projects")
      .delete()
      .eq("projectId", props.project.projectId);

    const { error: PaymentList_error } = await client
      .from("PaymentList")
      .delete()
      .eq("projectId", props.project.projectId);

    const { error: SettlementList_error } = await client
      .from("SettlementList")
      .delete()
      .eq("projectId", props.project.projectId);

    if (project_name_error || PaymentList_error || SettlementList_error) {
      alert("エラーが発生しました");
    } else {
      router.push("/ProjectList.page");
    }
  };

  const handleBackPage = () => {
    router.push("/ProjectList.page");
  };

  return (
    <>
      <ul className=" m-auto bg-white bg-opacity-30 ">
        {props.nameid.map((i: any, key: any) => {
          return (
            <PaymentList
              project={props.project}
              id={key}
              name={i}
              key={key}
              nameid={props.nameid}
              setNameId={props.setNameId}
              hasAdd={hasAdd}
              setAdd={setAdd}
            />
          );
        })}
      </ul>

      <div className="text-center mt-12 flex justify-center gap-4">
        <ButtonComponent onClick={handleDelete}>削除</ButtonComponent>
        <ButtonComponent onClick={handleBackPage}>戻る</ButtonComponent>
      </div>
    </>
  );
};
