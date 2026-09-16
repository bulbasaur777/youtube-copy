import SignInTab from "./SignInTab/SignInTab";
import SignUpTab from "./SignUpTab/SignUpTab";
import TabsUI from "./Tabs/Tabs";

export default function ModalSignIn() {
  return (
    <div className="flex h-auto text-text">
      <TabsUI
        tabsList={["Войти", "Регистрация"]}
        tabsContent={[<SignInTab key="signin" />, <SignUpTab key="signup" />]}
      />
      <div className="w-[250px] bg-[url('https://astatic.trovocdn.net/cat/img/1dbd2d1.jpg?max_age=31536000')] bg-cover bg-center"></div>
    </div>
  );
}
