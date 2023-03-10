import "../tablePage.scss";
import Navbar from "../../../components/navbar/Navbar";
import InventorySidebar from "../../../components/inventory/inventorySidebar/inventorySidebar";
import ShipmentDataTable from "../../../components/inventory/internalShipment/receiveDataTable";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const ReceiveData = () => {
  const { id } = useParams();
  console.log(id);
  const [status, setStatus] = useState("");
  const [WID, setWID] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://erp-system-nexeyo.herokuapp.com/inventory/internalShipment/getSingle/" +
          id,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        setWID(res.data[0].TOWID);
        setStatus(res.data[0].status);
      });
  }, [""]);

  const submitButton = (e) => {
    e.preventDefault();
    //alert("form submit");
    let data = {
      WID: WID,
      status: status,
      internalShipmentID: id,
    };
    axios
      .put(
        "https://erp-system-nexeyo.herokuapp.com/inventory/internalShipment/update/",
        data,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        if (res.data === "Internal Shipment Received") {
          alert("Internal Shipment Received");
          setWID(res.data[0].WID);
          setStatus("D");
        } else {
          alert("Sorry,Try again");
        }
      });
  };

  return (
    <div className="list">
      <InventorySidebar />
      <div className="listContainer">
        <Navbar />
        <ShipmentDataTable id={id} />
        {status === "P" && (
          <button
            style={{
              width: "150px",
              padding: "10px",
              border: "none",
              backgroundColor: "#0085cc",
              color: " white",
              fontWeight: "bold",
              cursor: " pointer",
              marginTop: "50px",
              marginLeft: "40%",
            }}
            onClick={submitButton}
          >
            Mark as Received
          </button>
        )}
      </div>
    </div>
  );
};

export default ReceiveData;
