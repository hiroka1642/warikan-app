import { Button, SidePanel, Typography } from "@supabase/ui";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { client } from "src/libs/supabase";
import { ListIcon, LogoutIcon, NewList } from "../Atom/Icons";
import { LinkButton2 } from "../Atom/LinkButton";

export const SidePanelBasic = () => {
  const [isVisible, setVisible] = useState(false);
  const router = useRouter();

  const handleRouter = (url: string) => {
    router.push(url);
  };

  const handleToggle = () => {
    setVisible(!isVisible);
  };
  const handleLogout = () => {
    client.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <Button type="default" onClick={handleToggle}>
        みんなでわりかん。
      </Button>
      <SidePanel
        align="left"
        visible={isVisible}
        title="みんなでわりかん。"
        onCancel={handleToggle}
        hideFooter
      >
        <Typography.Text className="flex justify-between flex-col h-full  ">
          <div className="w-full">
            <div className="h-20">
              <LinkButton2
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => {
                  return handleRouter("/ProjectList.page");
                }}
              >
                <ListIcon />
                <p>グループ一覧</p>
              </LinkButton2>
            </div>
            <div className="h-20">
              <LinkButton2
                // eslint-disable-next-line react/jsx-handler-names
                onClick={() => {
                  return handleRouter("/NewProject");
                }}
              >
                <NewList />
                <p>新規チーム作成</p>
              </LinkButton2>
            </div>
          </div>

          <div className="h-20 w-full mb-4">
            <LinkButton2 onClick={handleLogout}>
              <p>ログアウト</p>
              <LogoutIcon />
            </LinkButton2>
          </div>
        </Typography.Text>
      </SidePanel>
    </>
  );
};
