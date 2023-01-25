import UserCard from "./UserCard";

const UsersList = ({ data }) => {
  const renderUsers = () => {
    return data.map((user) => {
      return <UserCard key={user._id} data={user} />;
    });
  };
  return <div className="flex flex-col gap-3">{renderUsers()}</div>;
};

export default UsersList;
