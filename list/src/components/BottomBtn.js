import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function BottomBtn({ to, value }) {
  return (
    <>
      <button className="btn-task" type="submit">
        <span>
          <FontAwesomeIcon icon={faPlus} fade size="lg" />
          &nbsp;{value}
        </span>
      </button>

      <Link className="btn-task" to={to}>
        <span>
          <FontAwesomeIcon icon={faXmark} fade size="lg" />
          &nbsp;Cancel
        </span>
      </Link>
    </>
  );
}
export default BottomBtn;
