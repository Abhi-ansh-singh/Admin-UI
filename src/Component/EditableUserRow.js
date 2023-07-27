import React, { useState } from "react";

const EditableUserRow = ({
  data,
  setData,
  item,
  setSearchApiData,
  setEditingId,
  searchApiData
}) => {
  // saveEditData is a state variable to save the edited data
  const [saveEditData, setSaveEditData] = useState({ ...item });

  // Functionality to perform dynamic updates of user details by modifying the corresponding field value for a specific user.
  const handleInputChange = (field, value) => {
    setSaveEditData((prevData) => {
      return { ...prevData, [field]: value };
    });
  };

  const validateInput = () => {
    for (let key in saveEditData) {
      if (saveEditData[key] === "") {
        return false;
      }
    }
    return true;
  };

  // Functionality to update the data after editing.
  const handleUpdate = (id) => {
    if (validateInput() === false) {
      alert("Input fields should not be empty");
    } else {
      const updatedData = data.map((userData) => {
        if (userData.id === id) {
          return saveEditData;
        }
        return userData;
      });

      const updatedSearchApiData = searchApiData.map((userData) => {
        if (userData.id === id) {
          return saveEditData;
        }
        return userData;
      });

      setData(updatedData);
      setSearchApiData(updatedSearchApiData);
    }

    setEditingId(null);
    // Perform the update logic, such as making API calls or updating the state.
  };

  return (
    <>
      <td>
        <input
          type="text"
          value={saveEditData.name}
          onChange={(e) => handleInputChange("name", e.target.value)} // Calling handleInputChange function to change name
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.email}
          onChange={(e) => handleInputChange("email", e.target.value)} // Calling handleInputChange function to change email
        />
      </td>
      <td>
        <input
          type="text"
          value={saveEditData.role}
          onChange={(e) => handleInputChange("role", e.target.value)} // Calling handleInputChange function to change role
        />
      </td>
      <td>
        <button className="btn btn-sm" onClick={() => handleUpdate(item.id)}>
          <i class="fa-solid fa-floppy-disk" style={{ color: "#005eff" }}></i>
        </button>
      </td>
    </>
  );
};

export default EditableUserRow;
