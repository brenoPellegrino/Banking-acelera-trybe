import CreateAccForm from "../../components/CreateAccForm";
import RedirectButton from "../../components/RedirectButton";
import "./CreateAcc.css"

function CreateAcc() {

  return (
    <div className="container">
      <div className="form-container">
        <CreateAccForm isEditAcc={false} />
        <RedirectButton 
        path="/" 
        name="Back to login" 
        clearToken={true} />
      </div>
    </div>
  );
}

export default CreateAcc;
