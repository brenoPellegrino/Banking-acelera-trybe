import CreateAccForm from "../../components/CreateAccForm";
import RedirectButton from "../../components/RedirectButton";
import "./CreateAcc.css";

function CreateAcc() {
  return (
    <div className="container">
      <RedirectButton path="/" name="Back to login" clearToken={true} />
      <div className="form-container">
        <CreateAccForm isEditAcc={false} />
      </div>
    </div>
  );
}

export default CreateAcc;
