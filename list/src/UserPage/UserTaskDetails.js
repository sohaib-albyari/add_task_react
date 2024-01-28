import { Link } from "react-router-dom";
import "../cssPage/userDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

function TaskUserDetails() {
  return (
    <>
       <div className="mt-3 w-50 d-flex">
              <Link to={"/task"} className="btn task-btn">
                <FontAwesomeIcon icon={faHouse} fade size="lg" /> Back To Task
                Page
              </Link>
            </div>
    </>
  );
}
export default TaskUserDetails;
