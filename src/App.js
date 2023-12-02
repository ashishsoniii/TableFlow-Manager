import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import Pagination from "./components/Pagination";
import UsersList from "./components/UsersTable";
import axios from "axios";

// Function to initialize user properties

const processUsersResponse = (users) => {
  return users.map((user) => {
    user.selected = false;
    user.edit = false;
    user.show = true;
    return user;
  });
};

//sets up page size!
const config = {
  PAGE_SIZE: 10,
};

function App() {
  const [users, setUsers] = useState([]);
  const [update, setUpdate] = useState(false);
  const [page, setPage] = useState(1);

  //conts selected entries -> used in pagination component
  const selectedUsersCount = users.filter((user) => user.selected).length;

  const BackendURL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

  // Function to fetch users from the backend API or local file
  const getUsers = (setUsers) => {
    axios.get(BackendURL).then((res) => {
      setUsers(processUsersResponse(res.data));
    });
  };

  const selectAllRef = useRef(null);

  useEffect(() => {
    getUsers(setUsers);
  }, []);

  //fun for seaching as name , eemail , role
  const searchInUsers = (search, users) => {
    let tempSearch = search.toLowerCase();
    return users.map((user) => {
      if (
        user.name.toLowerCase().includes(tempSearch) ||
        user.email.toLowerCase().includes(tempSearch) ||
        user.role.toLowerCase().includes(tempSearch)
      ) {
        user.show = true;
        return user;
      }
      user.show = false;
      return user;
    });
  };

  //search user entry
  const searchUsers = (e) => {
    setPage(1);
    setUsers(searchInUsers(e.target.value, users));
  };

  //delete user
  const deleteUser = (id) => {
    let tempUsers = users.filter((user) => user.id !== id);
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  //edits user
  const editUser = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].edit = true;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  //saves user - updated entry
  const saveUser = (id, nameRef, emailRef, roleRef) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].name = nameRef.current.value;
    tempUsers[index].email = emailRef.current.value;
    tempUsers[index].role = roleRef.current.value;
    tempUsers[index].edit = false;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  //Selecting user
  const selectOne = (id) => {
    let tempUsers = users;
    const index = tempUsers.findIndex((user) => user.id === id);
    tempUsers[index].selected = !tempUsers[index].selected;
    setUsers(tempUsers);
    setUpdate((prevState) => !prevState);
  };

  //select All - but for that single entry page - 10
  const selectAll = (e) => {
    const listedUserIds = users
      .filter((user) => user.show)
      .slice(index, index + config.PAGE_SIZE)
      .map((user) => user.id);

    let tempUsers = users.map((user) => {
      if (listedUserIds.includes(user.id)) {
        user.selected = e.target.checked;
        return user;
      }
      return user;
    });

    setUsers(tempUsers);
    setUpdate(!update);
  };

  //delete selected user
  const deleteSelected = () => {
    if (window.confirm("Selected users will be deleted")) {
      setUsers((prevState) => prevState.filter((user) => !user.selected));
      selectAllRef.current.checked = false;
    }
  };

  const getRecordIndex = (page) => {
    return (page - 1) * config.PAGE_SIZE;
  };

  // entry index
  const index = getRecordIndex(page);

  return (
    <div className="App">
      <div class="bg-gray-700 text-white py-4">
        <h1 class="text-3xl font-semibold">TableFlow Manager</h1>
        <p class="text-sm">
          Playing with User Data - Select, Edit, Save, Delete
        </p>
      </div>

      <div className="container mx-auto p-4 my-5 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="Input-box">
          <input
            className=" search-icon border p-1 mb-4"
            placeholder="Search using name, email, or role"
            onChange={searchUsers}
            type="text"
            id="first_name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        <div className="Input-box">
          <div className="deleteBtn">
            <button
              onClick={() => deleteSelected()}
              type="button"
              className="delete text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Delete Selected Entry
            </button>
          </div>
        </div>
      </div>

      <UsersList
        page={page}
        setPage={setPage}
        selectAll={selectAll}
        selectAllRef={selectAllRef}
        selectOne={selectOne}
        saveUser={saveUser}
        editUser={editUser}
        deleteUser={deleteUser}
        users={users
          .filter((user) => user.show)
          .slice(index, index + config.PAGE_SIZE)}
      />

      <br />
      <br />
      <Pagination
        users={users
          .filter((user) => user.show)
          .slice(index, index + config.PAGE_SIZE)}
        usersLength={users.filter((user) => user.show).length}
        page={page}
        setPage={setPage}
        deleteSelected={deleteSelected}
        selectedUsersCount={selectedUsersCount}
      />
      <br />
      <br />
    </div>

    // </div>
  );
}

export default App;
