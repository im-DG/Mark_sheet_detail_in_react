import React, { useState } from "react";
import PieChart from "./pie";
import BarGraph from "./bar";
import AreaGraph from "./Areagraph";
import Summary from "./Summary";

const data = require("./data.json");
const Table = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [detailsRow, setDetailsRow] = useState(null);
  const [showCharts, setShowCharts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

const handleToggleCharts = () => {
  setShowCharts(!showCharts);
};

  const toggleSortOrder = () =>
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

const sortData = (columnName) => {
    const sortedData = [...data].sort((a, b) => {
      let valueA, valueB;
      if (columnName === "name") {
        valueA = a[columnName].toUpperCase();
        valueB = b[columnName].toUpperCase();
      } else if (columnName === "finalGrade") {
        valueA = (0.6 * a.exam_grade + 0.4 * a.rating_grade).toFixed(2);
        valueB = (0.6 * b.exam_grade + 0.4 * b.rating_grade).toFixed(2);
      } else {
        valueA = a[columnName];
        valueB = b[columnName];
      }
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sortedData;
  };
  
  const handleSort = (columnName) => {
    if (columnName === sortColumn) {
      toggleSortOrder();
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
    if (columnName === null) {
      setSortColumn(null);
      setSortOrder("asc");
    }
  };
  const handleReset = () => {
    setSortColumn(null);
    setSortOrder("asc");
  };
  

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    
  };

  const sortedData = sortColumn ? sortData(sortColumn) : data;

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredData = searchQuery// filtered data a variable  2 condition 
  ? sortedData.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : sortedData.filter((row) =>
      !statusFilter ||
      (statusFilter === "pass" && (0.6 * row.exam_grade + 0.4 * row.rating_grade).toFixed(2) > 4) ||
      (statusFilter === "fail" && (0.6 * row.exam_grade + 0.4 * row.rating_grade).toFixed(2) <= 4)
    );


 
function changeColor(e){
  if(e.target.innerHTML!=='Details')
  {
    if(!e.target.parentNode.classList.contains('selected')){
      console.log(e.target.parentNode.getElementsByTagName('td')[1]);
      
  const secondTd = e.target.parentNode.getElementsByTagName('td')[1];
  const na=secondTd.textContent;
  secondTd.textContent=na.toUpperCase();
      e.target.parentNode.classList.add('selected')
    }
    else{
      e.target.parentNode.classList.remove('selected')
      const secondTd = e.target.parentNode.getElementsByTagName('td')[1];
  const na=secondTd.textContent;
  secondTd.textContent=na.charAt(0).toUpperCase()+na.slice(1).toLowerCase();

    }
    
  }
}

return (
    <div>
      {showDetails && (
        <div className="details-modal">
          <div className="details-content">
            <div className="details-close" onClick={() => setShowDetails(false)}>
              &times;
            </div>
            <div className="details-content">
              <h2>Details for {detailsRow.name}</h2>
              <p>ID: {detailsRow.id}</p>
              <p>Ticket Number: {detailsRow.ticket_number}</p>
              <p>Ticket Topic: {detailsRow.ticket_topic}</p>
              <p>Exam Grade: {detailsRow.exam_grade}</p>
              <p>Rating Grade: {detailsRow.rating_grade}</p>
              <p>Comments: {detailsRow.comments}</p>
            </div>
          </div>
        </div>
      )}

      <div className="sushil">
      <input type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
        <button className="pass" onClick={() => handleStatusFilter("pass")}>
          Pass
        </button>
        <button className="fail" onClick={() => handleStatusFilter("fail")}>
          Failed
        </button>
        <button className="all" onClick={() => handleStatusFilter(null)}>
          All
        </button>
        <button className="reset" onClick={handleReset}>Reset</button>

      </div>

      <table className="my-table">
        <thead>
          <tr>
            <th>No</th>
            <th onClick={() => handleSort("name")}>
              Name {sortColumn === "name" && sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th>Ticket Number</th>
            <th>Ticket Topic</th>
            <th>Exam Grade</th>
            <th>Rating Grade</th>
            <th onClick={() => handleSort("finalGrade")}>
              Final Grade{" "}
              {sortColumn === "finalGrade" && sortOrder === "asc" ? "▲" : "▼"}
            </th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => {
            const finalGrade = (
              0.6 * row.exam_grade +
              0.4 * row.rating_grade
            ).toFixed(2);
            const status = finalGrade > 4 ? "Pass" : "Failed";
            return (

              <tr key={row.id} onClick={(e)=>{changeColor(e)}}>
                
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.ticket_number}</td>
                <td>{row.ticket_topic}</td>
                <td>{row.exam_grade}</td>
                <td>{row.rating_grade}</td>
                <td>{Number(finalGrade)}</td>
                <td>{status}</td>
                <td>
                  <button
                    className="details-button"
                    onClick={() => {
                      setShowDetails(true);
                      setDetailsRow(row);
                    }}
                  >
                    Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
      
      <button  className='show'onClick={handleToggleCharts}>
        {showCharts ? 'Hide statistics ' : ' Show statistics'}

      </button>
      {showCharts && (
        <div className="stat">
          <BarGraph data={filteredData} />
          <PieChart data={filteredData} />
          <AreaGraph data={filteredData}/>
          <Summary studentsData={filteredData} />
        </div>
      )}
    </div>
    </div>
  );
};

export default Table;
