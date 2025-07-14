import classNames from "classnames/bind";
import styles from "./Dashboard.module.scss";
import DashboardSVG from "../../icons/Dashboard/Dashboard";
import MemberSVG from "../../icons/Member/Member";
import BellSVG from "../../icons/Bell/bell";
import Card from "../../components/Card/Card";
import { setQueryParam } from "../../helper/setQueryParams";
import { useEffect, useState } from "react";
import FolderSVG from "../../icons/Folder/Folder";
import PersonSVG from "../../icons/Person/Person";
import Stage from "../../components/Stage/Stage";
import Modal from "../../components/Modal/Modal";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);

const Dashboard = () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const [param, setParam] = useState(id);
  const [boards, setBoards] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [stages, setStages] = useState({
    todo: ["Task 1", "Task 2"],
    doing: ["Task 3"],
    done: [],
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCardSelect = (id) => {
    setQueryParam("id", id);
    setParam(id);
  };

  const dropItem = (item, toStageKey) => {
    const fromStageKey = Object.keys(stages).find((key) =>
      stages[key].includes(item.value)
    );

    if (fromStageKey === toStageKey) return;

    setStages((prev) => {
      const newStages = { ...prev };
      newStages[fromStageKey] = newStages[fromStageKey].filter(
        (el) => el !== item.value
      );
      newStages[toStageKey] = [...newStages[toStageKey], item.value];
      return newStages;
    });
  };

  const handleSetModalState = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleAddBoard = (data) => {
    fetch("http://localhost:3000/api/v1/boards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bear ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setBoards((prev) => [...prev, data.metadata]);
      });

    reset();
    setIsOpenModal(false);
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/boards", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bear ${JSON.parse(localStorage.getItem("token"))}`,
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBoards(data.metadata);
      });
  }, []);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <img width="36px" height="36px" src="/logo.png" alt="logo" />
        <div className={cx("right_group")}>
          <BellSVG />
          <div className={cx("user_icon")}>BB</div>
        </div>
      </div>
      <div className={cx("body")}>
        <div className={cx("side_bar", param && "detail")}>
          {!param ? (
            <>
              <div className={cx("board_group")}>
                <DashboardSVG />
                <p className={cx("text")}>Boards</p>
              </div>
              <div className={cx("member_group")}>
                <MemberSVG />
                <p>All Members</p>
              </div>
            </>
          ) : (
            <div className={cx("detail-wrapper")}>
              <div className={cx("title")}>
                <span>Your boards</span>
              </div>
              <div className={cx("members")}>
                <div className={cx("card_name_group")}>
                  <FolderSVG />
                  <p className={cx("card_name_title")}>My trello board</p>
                </div>
              </div>
              <div className={cx("member_group")}>
                <MemberSVG />
                <p>All Members</p>
              </div>
              {/* Map list user here  */}
              <div className={cx("sidebar_footer")}>
                <p className={cx("footer_title")}>
                  You can't find and reopen closed boards if close the board
                </p>
                <button className={cx("footer_btn")}>Close</button>
              </div>
            </div>
          )}
        </div>
        <div className={cx("content", param && "detail")}>
          {param ? (
            <div className={cx("detail-content")}>
              <div className={cx("detail-header")}>
                <p className={cx("detail-content")}>My Trello Board</p>
                <button className={cx("invite-btn")}>
                  <PersonSVG /> Invite member
                </button>
              </div>
              <div className={cx("list-stage")}>
                {Object.keys(stages).map((key, idx) => (
                  <Stage
                    key={idx}
                    className={cx("stage-item")}
                    items={stages[key]}
                    title={key}
                    onDropItem={(item) => dropItem(item, key)}
                  />
                ))}

                <button className={cx("add-another")}>
                  + Add another list
                </button>
              </div>
            </div>
          ) : (
            <>
              <p className={cx("content_title")}>YOUR WORKSPACES</p>
              <div className={cx("cards")}>
                {boards.map((val, idx) => (
                  <Card
                    key={idx}
                    cardName={val.name}
                    handleClick={() => handleCardSelect(val.id)}
                  />
                ))}
                <div className={cx("add_new")} onClick={handleSetModalState}>
                  <p className={cx("text")}>+ Create a new board</p>
                </div>
                {isOpenModal && (
                  <Modal onClose={handleSetModalState}>
                    <form onSubmit={handleSubmit(handleAddBoard)}>
                      <p className={cx("modal-title")}>Create new board</p>
                      <label className={cx("modal-label")} htmlFor="name">
                        Name
                      </label>
                      <input
                        className={cx("modal-input")}
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "Board name is required",
                        })}
                      />
                      {errors.description && (
                        <p>{errors.description.message}</p>
                      )}
                      <label className={cx("modal-label")} htmlFor="desc">
                        Description
                      </label>
                      <input
                        className={cx("modal-input")}
                        type="text"
                        id="description"
                        {...register("description", {
                          required: "Board description is required",
                        })}
                      />
                      {errors.description && (
                        <p>{errors.description.message}</p>
                      )}
                      <div className={cx("btn-group")}>
                        <button
                          onClick={handleSetModalState}
                          className={cx("btn")}
                        >
                          Cancel
                        </button>
                        <button className={cx("btn")} type="submit">
                          Add
                        </button>
                      </div>
                    </form>
                  </Modal>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
