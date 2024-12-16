import React, { useEffect, useState } from "react";
import "./TodoListPage.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/model/Modal";
import { notifyError } from "../../utils/toast";

import AppButton from "../../components/button/AppButton";
import {
  fetchTodosThunk,
  updateTodoThunk,
  addNewTodoThunk,
  deleteTodoThunk,
  searchTodoThunk,
} from "../../redux/thunk/TodoThunk";
import AppInput from "../../components/input/AppInput";
import { SlMagnifier } from "react-icons/sl";

const TodoListPage = () => {
  const { data, error, isloading } = useSelector((state) => state.todoReducer);

  const dispatch = useDispatch();

  const [addNewTodoModal, setAddNewTodoModal] = useState(false);
  const [addNewTodoData, setAddNewTodoData] = useState({
    title: "",
    description: "",
    category: "",
    completed: false,
    priority: "low",
  });

  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [searchcInput, setSearchcInput] = useState("");
  const [deleteId, setDeleteId] = useState(undefined);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editData, setEditData] = useState({});

  const openEditModal = (data) => {
    setEditData(data);
    setEditShowModal(true);
  };

  const openDeleteModal = (data) => {
    setDeleteId(data?._id);
    setDeleteShowModal(true);
  };

  const handleInputChangeNewTodo = (e) => {
    const { name, value } = e.target;
    setAddNewTodoData({ ...addNewTodoData, [name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const searchtodo = (fun, delay = 300) => {
    let tiemout;
    return (...args) => {
      clearTimeout(tiemout);
      tiemout = setTimeout(() => {
        {
          fun.apply(this, args);
        }
      }, delay);
    };
  };

  const searchInputTodo = searchtodo((value) => {
    dispatch(searchTodoThunk(value));
  });

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  return (
    <>
      <div className="about-container">
        <div
          style={{ paddingLeft: "10px", paddingBottom: 0, marginBottom: 0 }}
          className="name-home-container"
        >
          <h1>Todo List</h1>
          <p>Organize your list by priority.</p>
        </div>
        <div className="add-container">
          <AppInput
            type="text"
            name={"search-todo"}
            isIcon={true}
            Icon={<SlMagnifier color="#0d6efd" />}
            value={searchcInput}
            onChange={(event) => {
              setSearchcInput(event.target.value);
              searchInputTodo(event.target.value);
            }}
          />
          <AppButton
            label="Add_Todo"
            className={"done-btn"}
            onClick={() => setAddNewTodoModal(true)}
          />
        </div>
        <div className="todo-container">
          {data !== undefined && data.length !== 0 ? (
            data?.map((ele, index) => (
              <div key={index} className="todo-card">
                <div className="todo-header">
                  <div className="todo-title"> {ele?.title}</div>
                  <div
                    className={`todo-priority ${
                      ele?.priority === "high"
                        ? "priority-high"
                        : ele?.priority === "medium"
                        ? "priority-medium"
                        : "priority-low"
                    }`}
                  >
                    {ele?.priority}
                  </div>
                </div>
                <div className="todo-description">{ele?.description}</div>
                <div className="todo-category">Category: {ele?.category}</div>
                <div className="todo-status">
                  <span className="status-label">
                    Completed:{" "}
                    <span
                      style={{
                        color: ele?.completed ? "#198754" : "#dc3545",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      {" "}
                      {ele?.completed ? "Yes" : "No"}
                    </span>
                  </span>
                </div>
                <div className="todo-actions">
                  <AppButton
                    className="edit-btn"
                    name="edit-btn"
                    title="Edit"
                    label="Edit"
                    onClick={() => openEditModal(ele)}
                  />
                  <AppButton
                    className="delete-btn"
                    name="delete-btn"
                    title="delete-btn"
                    label="Delete"
                    onClick={() => openDeleteModal(ele)}
                  />
                </div>
              </div>
            ))
          ) : (
            <span>No Todos...........</span>
          )}
        </div>
      </div>

      <div className="about-container">
        {/*add new todo model */}
        <Modal
          isOpen={addNewTodoModal}
          onClose={() => setAddNewTodoModal(false)}
        >
          <h3>Add New Todo</h3>
          <span htmlFor="title">Title:</span>
          <input
            type="text"
            id="title"
            name="title"
            value={addNewTodoData.title}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          />

          <span htmlFor="description">Description:</span>
          <input
            type="text"
            id="description"
            name="description"
            value={addNewTodoData.description}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          />

          <span htmlFor="category">Category:</span>
          <input
            type="text"
            id="category"
            name="category"
            value={addNewTodoData.category}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          />

          <span htmlFor="priority">Priority:</span>
          <select
            id="priority"
            name="priority"
            value={addNewTodoData.priority}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <span htmlFor="completed">Completed:</span>
          <select
            id="completed"
            name="completed"
            value={addNewTodoData.completed}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>

          <div className="modal-buttons">
            <AppButton
              label="Done"
              className="done-btn"
              onClick={() => {
                if (addNewTodoData?.title === "") {
                  notifyError("Please provide title!");
                  return;
                }
                if (addNewTodoData?.description === "") {
                  notifyError("Please provide description!");
                  return;
                }
                if (addNewTodoData?.category === "") {
                  notifyError("Please provide category!");
                  return;
                }
                dispatch(addNewTodoThunk(addNewTodoData));
                setAddNewTodoModal(false);
              }}
            />
            <AppButton
              label="Cancel"
              className="cancel-btn"
              onClick={() => setAddNewTodoModal(false)}
            />
          </div>
        </Modal>

        {/*edit model */}

        <Modal isOpen={editShowModal} onClose={() => setEditShowModal(false)}>
          <h3>Edit Todo</h3>
          <span>Title:</span>
          <input
            type="text"
            id="title"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="modal-input"
          />

          <span>Description:</span>
          <input
            type="text"
            id="description"
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            className="modal-input"
          />

          <span>Category:</span>
          <input
            type="text"
            id="category"
            name="category"
            value={editData.category}
            onChange={handleInputChange}
            className="modal-input"
          />

          <span>Priority:</span>
          <select
            id="priority"
            name="priority"
            value={editData.priority}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <span>Completed:</span>
          <select
            id="completed"
            name="completed"
            value={editData.completed}
            onChange={handleInputChange}
            className="modal-input"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>

          <div className="modal-buttons">
            <AppButton
              label="Done"
              className={"done-btn"}
              onClick={() => {
                dispatch(updateTodoThunk(editData));
                setEditShowModal(false);
              }}
            />
            <AppButton
              label="Cancel"
              className={"cancel-btn"}
              onClick={() => setEditShowModal(false)}
            />
          </div>
        </Modal>

        {/*delete model */}

        <Modal
          isOpen={deleteShowModal}
          onClose={() => setDeleteShowModal(false)}
        >
          <p>Are you want to delete this todo?</p>
          <div>
            <div className="modal-buttons">
              <AppButton
                label="Done"
                className={"done-btn"}
                onClick={() => {
                  dispatch(deleteTodoThunk(deleteId));
                  setDeleteShowModal(false);
                }}
              />
              <AppButton
                label="Cancel"
                className="cancel-btn"
                onClick={() => setDeleteShowModal(false)}
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default TodoListPage;
