import React, { useEffect, useState } from "react";
import SearchBar from "./SerachBar";
import Table from "./Table";
import PaginationUI from "./PaginationUI";
import "../App.css";

const AdminUI = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchApiData, setSearchApiData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  //making API call using useEffect.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const dataReceived = await response.json();
        setData(dataReceived);
        setSearchApiData(dataReceived);
      } catch (error) {
        alert("Error fetching data:", error);
        // Handling the error or display an error message
      }
    };

    fetchData();
  }, []);

  return (
    <section className="adminui-container">
      <SearchBar
        searchApiData={searchApiData}
        setData={setData}
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        data={data}
      />

      <Table
        data={data}
        setData={setData}
        currentPage={currentPage}
        usersPerPage={usersPerPage}
        setEditingId={setEditingId}
        editingId={editingId}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />

      <PaginationUI
        setCurrentPage={setCurrentPage}
        usersPerPage={usersPerPage}
        setData={setData}
        currentPage={currentPage}
        data={data}
        setSearchApiData={setSearchApiData}
        searchApiData={searchApiData}
      />
    </section>
  );
};

export default AdminUI;
