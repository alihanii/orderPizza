import { useDispatch, useSelector } from 'react-redux';
import { updateName, keepName } from './userSlice';
import { Link } from 'react-router-dom';

function CreateUser() {
  const dispatch = useDispatch();
  const x = useSelector((store) => store.user);
  const { username, keepname } = x;
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!keepname && (
        <>
          {' '}
          <p>👋 خوش آمدی! لطفا با گفتن نام خود به ما شروع کنید:</p>
          <input
            className="input mb-8 max-w-72"
            type="text"
            placeholder="نام شما"
            value={username}
            onChange={(e) => dispatch(updateName(e.target.value))}
            maxLength="10"
          />
        </>
      )}

      {username !== '' && (
        <div>
          <Link to={'/menu'}>
            <button onClick={() => dispatch(keepName())} className="button">
              {!keepname ? 'شروع به سفارش' : `سفارش جدید ${username}`}
            </button>
          </Link>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
