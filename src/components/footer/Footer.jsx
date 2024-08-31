import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";
import "./footer.scss";
/*import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
}
from "@fortawesome/free-brands-svg-icons";*/
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { useSelector } from "react-redux";
const Footer = (props) => {
  const navigate = useNavigate();

  const { user, users } = useSelector((store) => {
    return store.userState;
  });
  //trouver l'utilisateur qui est dans le cuerrent sate
  const userFind = users.find((userr) => {
    return userr.id_user === user.userId;
  });
  //Administration s'il ya un utilisateur avec un role admin=> navigate vers la page d'administration
  const handelAdministrationClick = () => {
    if (!userFind) return
    if (userFind.role !== "admin") return
    navigate(APP_ROUTES.NAV, { replace: true });
  };
  //apropos
  const handelAproposClick = () => {
    navigate(APP_ROUTES.APROPOS, { replace: true });
  };

  //contact
  const handelContactClick = () => {
    navigate(APP_ROUTES.CONTACT, { replace: true });
  };
  return (
    <div className="footer ">
      <div className="container">
        <section className="social">
          <h4>Sur les réseaux sociaux</h4>
          <div className="footer-font">
            <a href="https://www.facebook.com/">
              <FontAwesomeIcon
                icon={faFacebook}
                style={{ fontSize: "24px", color: "#f40b88" }}
              />
             
            </a>
            <a href="https://www.instagram.com/">
              <FontAwesomeIcon
                icon={faInstagram}
                style={{ fontSize: "24px", color: "#f40b88" }}
              />
             
            </a>
            <a href="https://twitter.com/">
              <FontAwesomeIcon
                icon={faTwitter}
                style={{ fontSize: "24px", color: "#f40b88" }}
              />
            
            </a>
            <a href="https://www.youtube.com/">
              <FontAwesomeIcon
                icon={faYoutube}
                style={{ fontSize: "24px", color: "#f40b88" }}
              />
            
            </a>
          </div>
        </section>
        <nav>
          <ul className="unstyled">
            <li>
              <a href="#" onClick={handelAproposClick}>
                A propos
              </a>
            </li>
            <li>
              <a href="#" onClick={handelContactClick}>
                Contactez-nous
              </a>
            </li>
            <li>
            <a href="#" onClick={handelAdministrationClick}>
                Administration
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
