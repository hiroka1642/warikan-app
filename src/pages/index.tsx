import { useEffect } from "react";
import { ButtonComponent } from "./components/button";
import { InputComponent } from "./components/Input";

export default function Home() {
  useEffect(() => {
    document.body.style.backgroundImage = "url(.//webBackgroundImage.jpg)";
    document.body.style.backgroundSize = "cover";
  }, []);

  const handleLogin = () => {
    // console.log("aaaa");
  };
  return (
    <>
      <h1 className="text-6xl text-center py-44">みんなでわりかん。</h1>
      <div className="w-96 text-center flex justify-center flex-col gap-10 items-center mx-auto ">
        <InputComponent>ニックネーム</InputComponent>
        <InputComponent>パスワード</InputComponent>
        <ButtonComponent onClick={handleLogin} href={"./Mainpage"}>
          ログイン
        </ButtonComponent>
      </div>
    </>
  );
}
