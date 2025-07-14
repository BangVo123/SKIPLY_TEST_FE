import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import Form from "../../../../components/Form/Form";

const cx = classNames.bind(styles);

const Login = () => {
  return (
    <div className={cx("wrapper")}>
      <img
        className={cx("decorator", "left_decorator")}
        width="300px"
        height="300px"
        src="/left_decorator.png"
        alt="decorator"
      />
      <img
        className={cx("decorator", "right_decorator")}
        width="300px"
        height="300px"
        src="/right_decorator.png"
        alt="decorator"
      />
      <Form />
    </div>
  );
};

export default Login;
