import { useRef } from "react";
import PropTypes from "prop-types";

import "../App.css";

const UserTableEntry = (props) => {
  const { user, deleteUser, editUser, saveUser, selectOne } = props;

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <tr key={user.id} className={user.selected ? "selected" : ""}>
      <td>
        <label
          htmlFor={`check-${user.id}`}
          className="cursor-pointer flex items-center justify-center"
        >
          <input
            id={`check-${user.id}`}
            type="checkbox"
            className="form-checkbox h-5 w-5 text-teal-500"
            onChange={() => selectOne(user.id)}
            checked={user.selected}
          />
        </label>
      </td>
      <td>
        <input
          className={user.edit ? "editable" : "readOnly"}
          readOnly={!user.edit}
          type="text"
          ref={nameRef}
          name="name"
          defaultValue={user.name}
        ></input>
      </td>
      <td>
        <input
          className={user.edit ? "editable" : "readOnly"}
          readOnly={!user.edit}
          type="email"
          ref={emailRef}
          name="email"
          defaultValue={user.email}
        />
      </td>
      <td>
        <input
          className={user.edit ? "editable" : "readOnly"}
          readOnly={!user.edit}
          type="text"
          ref={roleRef}
          name="role"
          defaultValue={user.role}
        />
      </td>
      <td className={"icons"}>
        {user.edit ? (
          <button
            onClick={() => saveUser(user.id, nameRef, emailRef, roleRef)}
            className="save px-2 py-1 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => editUser(user.id)}
            className="edit px-2 py-1 mx-2 bg-green-500 text-white rounded hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteUser(user.id)}
          className="delete px-2 py-1 mx-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none focus:ring focus:border-red-300"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

UserTableEntry.propTypes = {
  user: PropTypes.object,
  deleteUser: PropTypes.func,
  editUser: PropTypes.func,
  saveUser: PropTypes.func,
  selectOne: PropTypes.func,
};

export default UserTableEntry;
