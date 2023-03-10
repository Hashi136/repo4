import "../form.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../components/navbar/Navbar";
import InventorySidebar from "../../../components/inventory/inventorySidebar/inventorySidebar";
import axios from "axios";

const AddInternalShipmentsPart2 = () => {
  const [fromWID, setFromWID] = useState("");
  const [toWID, setToWID] = useState("");
  const [warehouse, setWarehouse] = useState({});

  useEffect(() => {
    const getWarehouse = async () => {
      const res = await axios.get(
        "https://erp-system-nexeyo.herokuapp.com/inventory/Warehouse/getAll",
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      setWarehouse(res.data);
    };
    getWarehouse();
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (fromWID === "" || toWID === "") {
      alert("Fill the required fields");
    } else if (fromWID === toWID) {
      alert("Try Again");
    } else {
      localStorage.setItem("FromWID", fromWID);
      localStorage.setItem("TOWID", toWID);
      window.location = "/inventory/internalShipments/add2";
    }
  };

  return (
    <div className="new">
      <InventorySidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Add Internal Shipment</h1>
        </div>

        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>From</label>

                <select
                  value={fromWID}
                  onChange={(e) => {
                    setFromWID(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select Warehouse
                  </option>
                  {Array.isArray(warehouse)
                    ? warehouse.map((w) => (
                        <option value={w.WID} key={w.WID}>
                          {w.WID}-{w.town}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="formInput">
                <label>To</label>

                <select
                  value={toWID}
                  onChange={(e) => {
                    setToWID(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    {" "}
                    Select Warehouse
                  </option>
                  {Array.isArray(warehouse)
                    ? warehouse.map((w) => (
                        <option value={w.WID} key={w.WID}>
                          {w.WID}-{w.town}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="break"></div>
              <button
                style={{
                  width: "150px",
                  padding: "10px",
                  border: "none",
                  backgroundColor: "#0085cc",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer",
                  margintop: "10px",
                }}
                onClick={submitForm}
              >
                Issue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInternalShipmentsPart2;
