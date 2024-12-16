import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./ChatPage.css";
import io from "socket.io-client";
import { format, isToday, isYesterday, isTomorrow } from "date-fns";
import { SlCheck, SlMagnifier, SlUser } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import AppButton from "../../components/button/AppButton";
import { GetMessagesThunk } from "../../redux/thunk/MessagesThunk";
import { setSelectedUser } from "../../redux/slices/MessagesSlice";
import AppInput from "../../components/input/AppInput";

export const socket = io("https://todolist-api-cyan.vercel.app", {
  transports: ["websocket"], // Use the same transports as on the server
  withCredentials: true, // Enable credentials if needed
});
// export const socket = io("http://localhost:3005");

const ChatPage = () => {
  const dispatch = useDispatch();
  const { allUserList, loginData } = useSelector((state) => state.userReducer);
  const { messagesData, selectedUser } = useSelector(
    (state) => state.messagesReducer
  );
  const messagesEndRef = useRef(null); // To scroll to the latest message
  const inputRef = useRef(null); // Create a ref for the input field

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(null);

  // Edit Messages:
  const [editingMessageId, setEditingMessageId] = useState(null); // Track editing message ID
  const [editedMessage, setEditedMessage] = useState(""); // Track edited message text

  // Filter users based on the search query
  const filteredUsers = allUserList.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn("messagesEndRef is not attached to an element.");
    }
  };

  const getDateLabel = (date) => {
    const messageDate = new Date(date);
    if (isToday(messageDate)) {
      return "Today";
    } else if (isYesterday(messageDate)) {
      return "Yesterday";
    } else if (isTomorrow(messageDate)) {
      return "Tomorrow";
    } else {
      return format(messageDate, "MMMM d, yyyy"); // Example: December 10, 2024
    }
  };

  const groupedMessages = useMemo(() => {
    return messagesData?.reduce((acc, message) => {
      const dateLabel = getDateLabel(message.createdAt);
      if (!acc[dateLabel]) {
        acc[dateLabel] = [];
      }
      acc[dateLabel].push(message);
      return acc;
    }, {});
  }, [messagesData]);

  const formatTime = useCallback(
    (isoString) => {
      const date = new Date(isoString);
      let hours = date.getHours();
      const minutes = date.getMinutes();

      const amPm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

      return `${hours}:${formattedMinutes} ${amPm}`;
    },
    [messagesData]
  );

  const handleEditMessage = (msg) => {
    setEditingMessageId(msg._id);
    setEditedMessage(msg.message);
  };

  const handleSaveEdit = (messageData) => {
    const { messageId, userId } = messageData;

    if (!editedMessage.trim()) return;

    // Emit socket event to update the message
    socket.emit("editMessage", {
      messageId,
      userId,
      newMessage: editedMessage,
    });

    // Reset editing states
    setEditingMessageId(null);
    setMenuOpen(null);
    setEditedMessage("");
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setMenuOpen(null);
    setEditedMessage("");
  };

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
    dispatch(
      GetMessagesThunk({
        senderId: loginData?.user?.id,
        recipientId: user?._id,
      })
    );
  };

  const submitHandler = () => {
    socket.emit("sendMessage", {
      senderId: loginData?.user?.id,
      recipientId: selectedUser?._id,
      message: newMessage,
    });
    setNewMessage("");
    inputRef.current?.blur(); // Defocus the input field
  };

  const handleMenuToggle = (messageId) => {
    setMenuOpen((prev) => (prev === messageId ? null : messageId));
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("deleteMessage", messageId);
  };

  useEffect(() => {
    // Join the current user's room
    socket.emit("joinRoom", loginData?.user?.id);

    // Listen for incoming messages
    socket.on("sendMessage", (message) => {
      const { senderId, recipientId } = message;
      if (
        (senderId === selectedUser?._id &&
          recipientId === loginData?.user?.id) ||
        (senderId === loginData?.user?.id && recipientId === selectedUser?._id)
      ) {
        dispatch(
          GetMessagesThunk({
            senderId: senderId,
            recipientId: recipientId,
          })
        );
      }
    });

    // Listen for delete message event from socket
    socket.on("deleteMessage", (message) => {
      const { senderId, recipientId } = message;
      if (
        (senderId === selectedUser?._id &&
          recipientId === loginData?.user?.id) ||
        (senderId === loginData?.user?.id && recipientId === selectedUser?._id)
      ) {
        dispatch(
          GetMessagesThunk({
            senderId: senderId,
            recipientId: recipientId,
          })
        );
      }
    });

    // Listen for delete message event from socket
    socket.on("markAsRead", (message) => {
      dispatch(
        GetMessagesThunk({
          senderId: loginData?.user?.id,
          recipientId: selectedUser?._id,
        })
      );
    });

    // Listen for edit message event from socket
    socket.on("editMessage", (updatedMessage) => {
      dispatch(
        GetMessagesThunk({
          senderId: loginData?.user?.id,
          recipientId: selectedUser?._id,
        })
      );
    });

    // Clean up the socket connection
    return () => {
      socket.off("sendMessage");
      socket.off("deleteMessage");
      socket.off("markAsRead");
      socket.off("editMessage");
    };
  }, [messagesData, selectedUser, loginData, dispatch]);

  useEffect(() => {
    if (!selectedUser || !loginData?.user?.id) return;

    messagesData?.forEach((msg) => {
      if (msg.senderId === selectedUser?._id && !msg.isRead) {
        socket.emit("markAsRead", {
          messageId: msg._id,
          recipientId: loginData?.user?.id,
        });
      }
    });
  }, [messagesData, selectedUser, loginData]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the latest message
  }, [messagesData]);

  return (
    <div className="chat-container">
      <div className="chat-wrapper">
        {/* User List Section (Left Side) */}
        <div className="user-list">
          {/* Search Bar */}
          <div className="search-bar">
            <AppInput
              name="search-users"
              type="text"
              placeholder="Search users..."
              isIcon={true}
              Icon={<SlMagnifier color="#0d6efd" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {filteredUsers?.map((user, index) => (
            <div
              onClick={() => selectedUserHandler(user)}
              key={index}
              className={`user-item ${
                selectedUser?._id === user?._id
                  ? "selected-user"
                  : "unSelected-user"
              }`}
            >
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {user?.profileImage ? (
                  <img
                    className="logo-image"
                    alt="profileImage"
                    src={user?.profileImage}
                  />
                ) : (
                  <div
                    style={{
                      backgroundColor: "lightgray",
                      borderRadius: "50%",
                      height: "40px",
                      width: "40px",
                      display: "inline-flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "6px",
                    }}
                  >
                    <SlUser color="#0d6efd" />
                  </div>
                )}
                <div>
                  <strong>{user.username}</strong>
                  <p>{user.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Chat Box Section (Right Side) */}
        <div className="chat-box">
          {messagesData?.length !== 0 ? (
            Object.keys(groupedMessages).map((dateLabel, id) => (
              <div
                className="chat-message-container"
                style={{ display: "flex" }}
                key={id}
              >
                {/* Date Divider */}
                <div className="date-divider">
                  <span>{dateLabel}</span>
                </div>

                {/* Messages */}
                {groupedMessages[dateLabel].map((msg, index) => (
                  <div
                    key={index}
                    className={`chat-message ${
                      msg?.senderId === loginData?.user?.id
                        ? "chat-sender"
                        : "chat-recipient"
                    }`}
                  >
                    {editingMessageId === msg?._id ? (
                      <div className="edit-message">
                        <input
                          name="edit-input"
                          type="text"
                          value={editedMessage}
                          onChange={(e) => setEditedMessage(e.target.value)}
                          className="edit-input"
                        />
                        <div className="edit-actions">
                          <button
                            onClick={() =>
                              handleSaveEdit({
                                messageId: msg?._id,
                                userId: loginData?.user?.id,
                              })
                            }
                          >
                            Save
                          </button>
                          <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p>{msg?.message}</p>
                        <div>
                          {/* Display the read status */}
                          <SlCheck
                            color={`${msg?.isRead ? "#0d6efd" : "#000"}`}
                          />
                          <span
                            style={{
                              fontSize: "12px",
                              justifyContent: "center",
                              alignItems: "center",
                              padding: "4px",
                            }}
                          >
                            {formatTime(msg?.createdAt)}
                          </span>
                        </div>

                        {/* Three-dot Menu */}
                        {msg?.senderId === loginData?.user?.id && (
                          <div
                            className="message-menu"
                            onMouseEnter={() => setMenuOpen(msg?._id)}
                            onMouseLeave={() => setMenuOpen(null)}
                          >
                            <span
                              className="three-dots"
                              onClick={() => handleMenuToggle(msg?._id)}
                            >
                              &#8226;&#8226;&#8226;
                            </span>

                            {/* Menu Options */}
                            {menuOpen === msg?._id && (
                              <div className="menu-dropdown">
                                <button onClick={() => handleEditMessage(msg)}>
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteMessage(msg?._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="no-messages">
              <img
                className="empty-image"
                src="/empty.png"
                alt="empty messaage"
              />
              <strong>YOU HAVE NO MESSAGES</strong>
              <p>
                Your inbox is empty send a message to your friend to get
                started.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
          <div className="chat-input">
            <input
              name="type-message"
              ref={inputRef}
              type="text"
              placeholder="Type your message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitHandler();
                }
              }}
            />
            <AppButton
              onClick={submitHandler}
              className={"chat-input-button"}
              title="Send"
              label="Send"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
