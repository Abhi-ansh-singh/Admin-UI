import React from "react";
import EditableUserRow from "./EditableUserRow";

const Table = ({
  data,
  setData,
  currentPage,
  usersPerPage,
  setEditingId,
  editingId,
  setSearchApiData,
  searchApiData
}) => {
  const getUserSlice = () => {
    const startIndex = (currentPage - 1) * usersPerPage; //logic to calculate the starting index of the current page's.
    const endIndex = startIndex + usersPerPage; //logic to calculate the ending index of the current page's .
    return data.slice(startIndex, endIndex); // logic to show data that should be displayed on the current page.
  };

  //Funtinality to select all user at once by cliking on checkbox present on current page.
  const handleSelectAllChange = (event) => {
    const updatedData = getUserSlice().map((user) => ({
      ...user,
      checked: event.target.checked
    }));
    const checkeddata = data.map((user) => {
      return {
        ...user,
        ...updatedData.find((checkedUsers) => checkedUsers.id === user.id)
      };
    });

    const chekedAllSearchApiData = searchApiData.map((user) => {
      return {
        ...user,
        ...updatedData.find((checkedUsers) => checkedUsers.id === user.id)
      };
    });
    setData(checkeddata);
    setSearchApiData(chekedAllSearchApiData);
  };

  //Functinality to select each user by clicking checkbox (we can select single or multiple user ).
  const handleCheckboxChange = (event, userId) => {
    const updatedData = data.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          checked: event.target.checked
        };
      }
      return user;
    });

    //Functionlaity to checked and update the search data
    const checkedSearchApiData = searchApiData.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          checked: event.target.checked
        };
      }
      return user;
    });
    setData(updatedData);
    setSearchApiData(checkedSearchApiData);
  };

  //Funtinality to delete the user
  const handleDelete = (id) => {
    const updatedData = data.filter((user) => user.id !== id);
    const updatedSearchApiData = searchApiData.filter((user) => user.id !== id);
    setData(updatedData);
    setSearchApiData(updatedSearchApiData);
  };

  //Funtionality to edit the email, name or role.
  const handleEdit = (id) => {
    setEditingId(id);
  };

  //Fintionality to make delete button unresponsive if edit button is clicked.
  const isDeleteDisabled = (id) => {
    return editingId === id;
  };

  return (
    <section className="">
      <table className="table">
        <thead>
          <tr className="header-sticky">
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAllChange} // calling handleSelectAllChange funtion
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getUserSlice().map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(event) => handleCheckboxChange(event, item.id)} // calling handleCheckboxChange funtion
                />
              </td>
              {editingId === item.id ? (
                <EditableUserRow
                  data={data}
                  setData={setData}
                  item={item}
                  setSearchApiData={setSearchApiData}
                  setEditingId={setEditingId}
                  searchApiData={searchApiData}
                />
              ) : (
                <>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleEdit(item.id)}
                    >
                      <i
                        class="fa-solid fa-file-pen"
                        style={{ color: "#000000" }}
                      ></i>
                    </button>{" "}
                    <button
                      className="btn btn-sm"
                      onClick={() => handleDelete(item.id)} //calling handleDelete funtion
                      disabled={isDeleteDisabled(item.id)} //calling isDeleteDisabled funtion
                    >
                      <i class="fa-solid fa-trash" style={{ color: "red" }}></i>
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
