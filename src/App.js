import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [clients, setClients] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    assignedDate: "",
    deadline: "",
  });
{/*Client details*/}
  useEffect(() => {
    const stored = localStorage.getItem("clientList");
    if (stored) {
      setClients(JSON.parse(stored));
    } else {
      setClients([
        {
          id: 1,
          name: "ABC Corp",
          project: "Website Redesign",
          status: "Discussion phase",
          assignedDate: "2025-11-01",
          deadline: "2025-11-10",
        },
        {
          id: 2,
          name: "XYZ Ltd",
          project: "Mobile App Development",
          status: "Ongoing",
          assignedDate: "2025-11-02",
          deadline: "2025-11-20",
        },
        {
          id: 3,
          name: "DEF Inc",
          project: "Branding Campaign",
          status: "Completed",
          assignedDate: "2025-10-25",
          deadline: "2025-10-30",
        },
      ]);
    }
    setIsDataLoaded(true);
  }, []);

  useEffect(() => {
    const updateStatuses = () => {
      const today = new Date().toISOString().split("T")[0];
      setClients((prevClients) =>
        prevClients.map((client) => {
          if (
            client.deadline &&
            client.deadline < today &&
            client.status !== "Completed" &&
            client.status !== "Lost" &&
            client.status !== "No response"
          ) {
            return { ...client, status: "No response" };
          }
          return client;
        })
      );
    };

    updateStatuses();
    const interval = setInterval(updateStatuses, 60000);
    return () => clearInterval(interval);
  }, [clients]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, project, assignedDate, deadline } = formData;

    if (!name || !project || !assignedDate || !deadline) {
      alert("Please fill out all fields!");
      return;
    }

    const newClient = {
      id: clients.length + 1,
      name,
      project,
      assignedDate,
      deadline,
      status: "Discussion phase",
    };

    setClients([...clients, newClient]);
    setFormData({ name: "", project: "", assignedDate: "", deadline: "" });
  };

  const updateStatus = (id, newStatus) => {
    setClients(
      clients.map((client) =>
        client.id === id ? { ...client, status: newStatus } : client
      )
    );
  };

  const clearAll = () => {
    const confirmClear = window.confirm("⚠️ Are you sure you want to clear all data?");
    if (confirmClear) {
      localStorage.removeItem("clientList");
      setClients([]);
      alert("✅ All client data has been cleared successfully!");
    } else {
      alert("❌ Data not cleared.");
    }
  };
{/*Dropdown Menu */}
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
      case "No response":
        return "status-no-response";
      default:
        return "";
    }

  };
{/*Title */}
  return (
    <div className="app-container fade-in">
      <header className="header">
  <h1 className="title-3d">Client Status Tracker</h1>
</header>
      {/* Add New Client Form */}
      <form onSubmit={handleSubmit} className="add-client-form">
        <div className="form-inputs">
          <input
            type="text"
            placeholder="Client Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Project Name"
            value={formData.project}
            onChange={(e) => setFormData({ ...formData, project: e.target.value })}
          />
          <input
            type="date"
            value={formData.assignedDate}
            onChange={(e) =>
              setFormData({ ...formData, assignedDate: e.target.value })
            }
          />
          <input
            type="date"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="add-btn"> Add Client</button>
          <button type="button" className="clear-btn" onClick={clearAll}>
             Clear All
          </button>
        </div>
      </form>

      {/* Table Section */}
      <main className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Project</th>
              <th>Assigned Date</th>
              <th>Deadline</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.name}</td>
                <td>{client.project}</td>
                <td>{client.assignedDate}</td>
                <td>{client.deadline}</td>
                <td>
                  <select
                    value={client.status}
                    onChange={(e) => updateStatus(client.id, e.target.value)}
                    className={`status-select ${getStatusClass(client.status)}`}
                  >
                    <option value="Discussion phase">Discussion phase</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Lost">Lost</option>
                    <option value="No response">No response</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
