import { useNavigate, useRouteError } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="mt-5 space-y-2 text-center">
      <h1>خطایی رخ داده 😢</h1>
      <p>{error.data}</p>
      <button className="linkBack" onClick={() => navigate(-1)}>
        &larr; بازگشت
      </button>
    </div>
  );
}

export default NotFound;
