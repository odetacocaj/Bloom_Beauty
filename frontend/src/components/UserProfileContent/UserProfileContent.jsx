import UserProfileForm from "../UserProfileForm/UserProfileForm";
import { useGetMe } from "../../api/hooks/useUser";
import ChangePassword from "../ChangePassword/ChangePassword";

const UserProfileContent = ({ sectionId }) => {
  const { data: user, isLoading, isError } = useGetMe();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Failed to load user data</div>;
  const content = {
    personal: (
      <div className="w-full">
        <h1 className="font-sans font-[500] text-xl text-[#383838] pl-4 pt-2">
          Personal Information
        </h1>
        <UserProfileForm user={user} />
      </div>
    ),
    password: (
      <div className="w-full">
        <h1 className="font-sans font-[500] text-xl text-[#383838] pl-4 pt-2">Change Password</h1>
        <ChangePassword />
      </div>
    ),
    orders: <p>orderssss</p>,
  };

  return (
    <div className="section-content flex flex-col gap-3 bg-white p-7 shadow-custom rounded-md w-full">
      {content[sectionId]}
    </div>
  );
};

export default UserProfileContent;
