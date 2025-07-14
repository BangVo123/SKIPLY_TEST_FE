import classNames from "classnames/bind";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

const Card = ({ cardName, handleClick }) => {
  return (
    <div className={cx("card")} onClick={handleClick}>
      <p className={cx("name")}>{cardName}</p>
    </div>
  );
};

export default Card;
