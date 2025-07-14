import classNames from "classnames/bind";
import { useDrag, useDrop } from "react-dnd";
import styles from "./Stage.module.scss";

const cx = classNames.bind(styles);

const Item = ({ value }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { value },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div ref={drag} className={cx("item", isDragging && "drag")}>
      {value}
    </div>
  );
};

const Stage = ({ className, onDropItem, items, title }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "ITEM",
    drop: onDropItem,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });
  return (
    <div className={cx("wrapper", className)} ref={drop}>
      <p className={cx("heading-title")}>{title.toUpperCase()}</p>
      <div>
        {items.map((el, idx) => {
          return <Item key={idx} value={el} />;
        })}
      </div>
      <button className={cx("btn")}>+ Add to card</button>
    </div>
  );
};

export default Stage;
