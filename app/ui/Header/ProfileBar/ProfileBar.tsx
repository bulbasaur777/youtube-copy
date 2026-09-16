import UserSetting from "./UserSettingsContent/UserSettingContent";
import MobileSearch from "./MobileSearch/MobileSearch";
import Notifications from "./Notifications/Notifications";
import CreateMenu from "./CreateMenu/CreateMenu";

export default function ProfileBar() {
  return (
    <div className="flex justify-end items-center gap-2 lg:w-[50%] xl:w-[33.3%]">
      <MobileSearch />

      <div className="flex items-center gap-3 sm:gap-6">
        <div className="flex sm:gap-1">
          <CreateMenu />
          <Notifications />
        </div>
        <UserSetting />
      </div>
    </div>
  );
}
