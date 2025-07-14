import classNames from "classnames/bind";
import styles from "./UserItem.module.scss";

const cx = classNames.bind(styles);

const UserItem = ({ img, name }) => {
  return <div className={cx("wrapper")}>
    <p>{name}</p>
  </div>;
};
