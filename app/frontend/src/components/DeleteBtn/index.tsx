import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./DeleteBtn.css";

export default function DeleteBtn() {

  const navigate = useNavigate();

  async function deleteAccount () {
    try {
      const token = localStorage.getItem('@token');

      if (!token) throw new Error('Token not found');

      await api.delete('/users', {headers: {Authentication: `${token}`}});

      localStorage.removeItem('@token');

      alert('Account inactivated');

      navigate('/');

    } catch (error) {
      console.log(error);
      if(error instanceof Error && error.message === 'Token not found') alert('Token not found');
      return;
    }
  } 

  return (
    <div>
      <button
        className="delete-btn"
        onClick={() => deleteAccount()}
      >
        Delete account
      </button>
    </div>
  )
}
