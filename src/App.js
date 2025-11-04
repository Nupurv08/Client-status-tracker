import React, { useState } from "react";
import "./App.css"; // Import CSS file

function App() {
  const [clients, setClients] = useState([
    { id: 1, name: "ABC Corp", project: "Website Redesign", status: "Discussion phase" },
    { id: 2, name: "XYZ Ltd", project: "Mobile App Development", status: "Ongoing" },
    { id: 3, name: "DEF Inc", project: "Branding Campaign", status: "Completed" },
    { id: 4, name: "GHI Co", project: "SEO Optimization", status: "Discussion phase" },
    { id: 5, name: "JKL Pvt ltd", project: "Logo design", status: "Lost" },
    { id: 6, name: "AB Media", project: "Website design", status: "Discussion phase" },
    { id: 7, name: "Nathcop", project: "Poster design", status: "Ongoing" },
    { id: 8, name: "Media Co", project: "SEO Optimization", status: "Discussion phase" },
   ]);
  const handleStatusChange = (id, newStatus) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, status: newStatus } : client
      )
    );
  };

  const getStatusClass = (status) => {
  switch (status) {
    case "Discussion phase":
      return "status-discussion-phase";
    case "Ongoing":
      return "status-ongoing";
    case "Completed":
      return "status-completed";
    case "Lost":
      return "status-lost"; 
    default:
      return "";
  }
};


  return (
    <div className="app-container">
      <h1>Client Status Tracker</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Project</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.project}</td>
                <td>
                  <select
                    value={client.status}
                    onChange={(e) =>
                      handleStatusChange(client.id, e.target.value)
                    }
                    className={getStatusClass(client.status)}
                  >
                    <option value="Discussion phase">Discussion phase</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Lost">Lost</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
