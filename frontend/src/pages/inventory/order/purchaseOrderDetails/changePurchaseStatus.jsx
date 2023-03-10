import "../../form.scss";
import Navbar from "../../../../components/navbar/Navbar";
import InventorySidebar from "../../../../components/inventory/inventorySidebar/inventorySidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChangePurchaseOrderStatus = () => {
  const [WID, setWID] = useState("");
  const [status, setStatus] = useState("");
  const [reason, setReason] = useState("");

  const { purchaseOrderID } = useParams();
  //console.log(purchaseOrderID);

  useEffect(() => {
    axios
      .get(
        "https://erp-system-nexeyo.herokuapp.com/inventory/purchaseOrder/getSingle/" +
          purchaseOrderID,
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        setWID(res.data[0].WID);
        setStatus(res.data[0].status);
      });
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (WID === "" || status === "") {
      alert("Fill the required fields");
    } else if (status === "C" && reason === "") {
      alert("Fill the required fields");
    } else {
      let data;
      if (status === "D") {
        data = {
          purchaseOrderID: purchaseOrderID,
          WID: WID,
          status: status,
        };
      }
      if (status === "C") {
        data = {
          purchaseOrderID: purchaseOrderID,
          WID: WID,
          status: status,
          reason: reason,
        };
      }
      console.log(data);

      axios
        .put(
          "https://erp-system-nexeyo.herokuapp.com/inventory/purchaseOrder/update/",
          data,
          {
            withCredentials: true,
            credentials: "include",
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data === "Purchase order Received") {
            setWID(res.data[0].WID);
            setStatus("D");
            alert("Purchase order Received");
            window.location = "/inventory/order/purchaseOrders";
          } else if (res.data === "Purchase order Returned") {
            setWID(res.data[0].WID);
            setStatus("C");
            alert("Purchase order Returned");
            window.location = "/inventory/order/purchaseOrders";
          } else {
            alert("Try again");
          }
        });
    }
  };

  return (
    <div className="new">
      <InventorySidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Change Order Status</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Purchase order Id</label>
                <input type="text" disabled value={purchaseOrderID} />
              </div>

              <div className="formInput">
                <label>WID</label>
                <input type="number" value={WID} disabled />
              </div>
              <div className="formInput">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option value="P" disabled selected>
                    {" "}
                    Pending{" "}
                  </option>
                  <option value="D">Delivered</option>
                  <option value="C">Cancelled</option>
                </select>
              </div>

              {status === "C" ? (
                <div className="formInput">
                  <label>Reason for Returning</label>
                  <input
                    type="text"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </div>
              ) : (
                ""
              )}

              <div className="break"></div>
              <button onClick={submitForm}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChangePurchaseOrderStatus;
