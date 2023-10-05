import CreateAccForm from "../../components/CreateAccForm";
import DeleteBtn from "../../components/DeleteBtn";
import Menu from "../../components/Menu";
import RedirectButton from "../../components/RedirectButton";
import "./EditAcc.css";

export default function EditAcc() {
  const token = localStorage.getItem("@token");

  if (!token) {
    console.log("token not found");
    return window.location.href = "/";
  }

  return (
    <div className="edit-acc-container">
      <div className="menu-container">
        <Menu />
      </div>
      <div className="page-content">
        <div className="redirect-button-container">
          <RedirectButton path="/home" name="Home" clearToken={false} />
        </div>
        <div className="create-acc-form-container">
          <CreateAccForm isEditAcc={true} />
        </div>
        <div className="delete-btn-container">
          <DeleteBtn />
        </div>
      </div>
    </div>
  );
}
