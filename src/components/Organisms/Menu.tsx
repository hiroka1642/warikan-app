import { useDisclosure } from "@chakra-ui/hooks";
import { ListIcon, LogoutIcon, NewList } from "../Atom/Icons";
import { useRouter } from "next/dist/client/router";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { LinkButton } from "../Atom/LinkButton";
import { HamburgerIcon } from "@chakra-ui/icons";
import { client } from "src/libs/supabase";

export const Menu = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOnOpen = () => {
    onOpen();
  };

  const handleOnClose = () => {
    onClose();
  };
  const handleRouter = (url: string) => {
    router.push(url);
  };

  const handleLogout = () => {
    client.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <button
        className="sm:invisible top-0 fixed p-1 text-gray-700"
        onClick={handleOnOpen}
      >
        <HamburgerIcon width="35px" height="35px" />
      </button>

      <Drawer placement="left" onClose={handleOnClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">メニュー</DrawerHeader>
          <DrawerBody>
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col ">
                <LinkButton
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={() => {
                    return handleRouter("/ProjectList.page");
                  }}
                >
                  <ListIcon color={"rgba(30, 64, 175)"} />
                  チーム一覧
                </LinkButton>

                <LinkButton
                  // eslint-disable-next-line react/jsx-handler-names
                  onClick={() => {
                    return handleRouter("/ProjectList.page");
                  }}
                >
                  <NewList color={"rgba(30, 64, 175)"} />
                  新規チーム作成
                </LinkButton>
              </div>
              <LinkButton onClick={handleLogout}>
                <p>ログアウト</p>
                <LogoutIcon color={"rgba(30, 64, 175)"} />
              </LinkButton>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
