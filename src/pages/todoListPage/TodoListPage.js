import React, { useEffect, useState } from "react";
import "./TodoListPage.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/model/Modal";
import { notifyError } from "../../utils/toast";
// import { IoIosSearch } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import { FiEdit, FiXOctagon } from "react-icons/fi";

import AppButton from "../../components/button/AppButton";
import {
  fetchTodosThunk,
  updateTodoThunk,
  addNewTodoThunk,
  deleteTodoThunk,
  searchTodoThunk,
} from "../../redux/thunk/TodoThunk";

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
  }, []);

  return (
    <div className="about-container">
      <div className="table-container">
        <h2 className="table-header">Todo List</h2>
        <div className="add-container">
          <div className="search-input-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchcInput}
              onChange={(event) => {
                setSearchcInput(event.target.value);
                searchInputTodo(event.target.value);
              }}
            />
            <div className="search-icon-container">
              <SlMagnifier color="#0d6efd" />
            </div>
          </div>
          <AppButton
            label="Add Todo"
            className={"done-btn"}
            onClick={() => setAddNewTodoModal(true)}
          />
        </div>
        {data !== undefined && data.length !== 0 ? (
          <div className="table">
            <div className="table-row header">
              <div className="table-cell">Title</div>
              <div className="table-cell">Description</div>
              <div className="table-cell">Category</div>
              <div className="table-cell">Priority</div>
              <div className="table-cell">Completed</div>
              <div className="table-cell">Actions</div>
            </div>
            {data?.map((ele) => (
              <div key={ele?._id} className="table-row">
                <div
                  className={`table-cell ${
                    ele?.completed && `text-decoration`
                  }`}
                >
                  {ele?.title}
                </div>
                <div className="table-cell">{ele?.description}</div>
                <div className="table-cell">{ele?.category}</div>
                <div className="table-cell">
                  <span
                    style={{
                      backgroundColor:
                        ele?.priority === "high"
                          ? "#dc3545"
                          : ele?.priority === "medium"
                          ? "#0d6efd"
                          : "#198754",
                      borderRadius: "4px",
                      color: "white",
                    }}
                  >
                    {ele?.priority}
                  </span>
                </div>
                <div className="table-cell">
                  <span
                    style={{
                      color: ele?.completed ? "#198754" : "#dc3545",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    {ele?.completed ? "Yes" : "No"}
                  </span>
                </div>
                <div className="table-cell">
                  <button
                    className="action-btn"
                    title="Edit"
                    onClick={() => openEditModal(ele)}
                  >
                    <FiEdit color="#198754" />
                  </button>
                  <button
                    className="action-btn"
                    title="Delete"
                    onClick={() => openDeleteModal(ele)}
                  >
                    <FiXOctagon color="#dc3545" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>No Todos...........</span>
        )}
      </div>

      {/*add new todo model */}

      <Modal isOpen={addNewTodoModal} onClose={() => setAddNewTodoModal(false)}>
        <h3>Add New Todo</h3>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={addNewTodoData.title}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={addNewTodoData.description}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={addNewTodoData.category}
            onChange={handleInputChangeNewTodo}
            className="modal-input"
          />

          <label htmlFor="priority">Priority:</label>
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

          <label htmlFor="completed">Completed:</label>
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
        </form>
      </Modal>

      {/*edit model */}

      <Modal isOpen={editShowModal} onClose={() => setEditShowModal(false)}>
        <h3>Edit Todo</h3>
        <form>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editData.title}
            onChange={handleInputChange}
            className="modal-input"
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={editData.description}
            onChange={handleInputChange}
            className="modal-input"
          />

          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={editData.category}
            onChange={handleInputChange}
            className="modal-input"
          />

          <label htmlFor="priority">Priority:</label>
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

          <label htmlFor="completed">Completed:</label>
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
        </form>
      </Modal>

      {/*delete model */}

      <Modal isOpen={deleteShowModal} onClose={() => setDeleteShowModal(false)}>
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
  );
};

export default TodoListPage;
