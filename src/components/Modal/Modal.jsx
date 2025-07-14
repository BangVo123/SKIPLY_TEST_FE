import classNames from "classnames/bind";
import styles from "./Modal.module.scss";

const cx = classNames.bind(styles);

const Modal = ({ children, onClose }) => {
  const handleKeepDisplayModal = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={cx("wrapper")} onClick={onClose}>
      <div className={cx("overlay")}>
        <div className={cx("content")} onClick={handleKeepDisplayModal}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
