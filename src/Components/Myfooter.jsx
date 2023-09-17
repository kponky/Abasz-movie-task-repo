import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export default function MyFooter() {
  return (
    <div className="pt-20 text-center">
      <div className="flex justify-center gap-[20px] text-[25px] items-center">
        <a href="https://web.facebook.com/ikponkeabasi.essia/" target="_blank">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href=""  target="_blank">
          <FontAwesomeIcon icon={faInstagram} />
        </a >
        <a href="https://www.youtube.com/channel/UCv34M0a7h0tRfy4T1iThvBQ"  target="_blank">
          <FontAwesomeIcon icon={faYoutube} />
        </a>
        <a href="https://twitter.com/AbasiEssia"  target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
      </div>
      <div className="flex justify-center items-center mt-5">
        <h5>Conditions of Use</h5>
        <h5 className="ml-5">Privacy Policy</h5>
        <h5 className="ml-5">Press Room</h5>
      </div>

      <p className="mt-5 text-gray-400">&copy; 2023 MovieBox by Abtech</p>
    </div>
  );
}