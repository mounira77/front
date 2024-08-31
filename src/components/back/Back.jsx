import { useEffect } from "react";
import "./back.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Back = (props) => {
    const navigate = useNavigate();
    const backClick = () => {
        navigate(-1)
    }
    return (
        <p className="icon">
       <FontAwesomeIcon icon={faArrowLeft} onClick={backClick} className="classBack" />
       </p>
    );
};

export default Back;
