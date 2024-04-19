import { useSelector } from 'react-redux';

function UserName() {
  const s = useSelector((store) => store.user);
  const { username, keepname } = s;
  if (!keepname) return;
  return (
    <p className={`${username && 'sm:block'} hidden text-sm font-semibold `}>
      {username}
    </p>
  );
}

export default UserName;
