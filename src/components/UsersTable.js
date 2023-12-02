import PropTypes from "prop-types";
import { useEffect } from "react";
import "../App.css";

import UserComponent from "./UserTableEntry";

const config = {
  PAGE_SIZE: 10,
};

const UserTable = (props) => {
  const {
    users,
    deleteUser,
    editUser,
    saveUser,
    selectAll,
    selectOne,
    selectAllRef,
    setPage,
    page,
  } = props;

  useEffect(() => {
    if (users.length === 0 && page > 1) {
      setPage(page - 1);
    }
  }, [page, setPage, users.length]);

  let fillRows = [];
  for (
    let i = users.filter((user) => user.show).length;
    i < config.PAGE_SIZE;
    i++
  ) {
    fillRows.push(<tr key={i}></tr>);
  }

  if (users.length === 0 && page === 1) {
    return (
      <div className="text-center text-gray-500 py-4">
        No users in the system.
      </div>
    );
  }

  return (
    <>
      <table
        className={`table bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden transform translate-y-2 w-full  p-4`}
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 flex items-center justify-center ">
              <label
                htmlFor="selectAll"
                className="cursor-pointer flex items-center justify-center"
              >
                <input
                  type="checkbox"
                  ref={selectAllRef}
                  onChange={(e) => {
                    selectAll(e);
                  }}
                  name="selectAll"
                  id="selectAll"
                  className="form-checkbox h-5 w-5 text-teal-500 cursor-pointer"
                />
              </label>
            </th>

            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => {
            return user.show ? (
              <UserComponent
                selectOne={selectOne}
                saveUser={saveUser}
                editUser={editUser}
                deleteUser={deleteUser}
                key={user.id}
                user={user}
              />
            ) : null;
          })}
          {fillRows}
        </tbody>
      </table>
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.array,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectAll: PropTypes.func,
  selectOne: PropTypes.func,
  selectAllRef: PropTypes.object,
  setPage: PropTypes.func,
  page: PropTypes.number,
};

export default UserTable;
