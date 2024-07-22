import styles from "./Rodape.module.scss";
import {
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineGithub,
} from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";

export default function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.rodape__texto}>
        Feito por{" "}
        <a href="https://luishenrique-dev.com.br/" target="_blank">
          Luis Henrique <FiExternalLink />
        </a>{" "}
        |
      </div>
      <div className={styles.rodape__links}>
        <a href="https://www.instagram.com/luissshc_/" target="_blank">
          <AiOutlineInstagram />
        </a>
        <a
          href="https://www.linkedin.com/in/luis-henrique-6a7425165/"
          target="_blank"
        >
          <AiOutlineLinkedin />
        </a>
        <a href="https://github.com/luissshc29" target="_blank">
          <AiOutlineGithub />
        </a>
      </div>
    </footer>
  );
}
