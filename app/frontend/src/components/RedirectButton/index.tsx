import { useNavigate } from 'react-router-dom';

export default function RedirectButton({ path, name, clearToken }: { path: string, name: string, clearToken: boolean }) {
  const navigate = useNavigate();

  function clearTokenFromLocalStorage () {
    localStorage.removeItem('@token');
  }

  function redirect (path: string) {

    if (clearToken) clearTokenFromLocalStorage();

    return navigate(path);
  }

  return (
    <div>
        <button
          onClick = {() => redirect(path)}
          className='redirect-button'
        >
          {name}
        </button>
    </div>
  )
}
