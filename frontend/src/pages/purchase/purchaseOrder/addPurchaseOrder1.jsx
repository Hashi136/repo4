import "./purchaseOrder.scss";
import { useState } from "react";
import Navbar from "../../../components/navbar/Navbar";
import Sidebar from "../../../components/purchase_sidebar/purchase_sidebar";
import axios from "axios";

const AddPurchaseOrder1 = () => {
  const [PID, setPID] = useState(0);
  const [qty, setQty] = useState(0);
  const [productName, setProductName] = useState("");
  const [discount, setdiscount] = useState(0);

  const [list, setList] = useState([]);

  const submitForm = (e) => {
    e.preventDefault();
    setQty(parseInt(qty));
    if (qty > 0) {
      if (list.length !== 0) {
        let status = false;
        for (let i = 0; i < list.length; i++) {
          if (list[i].PID === PID) {
            list[i].qty = parseInt(list[i].qty) + parseInt(qty);
            status = true;
          }
        }
        if (!status) {
          setList([
            ...list,
            {
              PID: PID,
              name: productName,
              qty: parseInt(qty),
              discount: parseFloat(discount),
            },
          ]);
        }
      } else {
        setList([
          {
            PID: PID,
            name: productName,
            qty: parseInt(qty),
            discount: parseFloat(discount),
          },
        ]);
      }

      setProductName("");
      setQty(0);
      setPID(0);
      setdiscount(0);
      alert("Product added to cart");
    } else {
      alert("Enter valid quantity");
    }
  };

  const checkProduct = async (val) => {
    if (val !== "") {
      const res = await axios.get(
        "https://erp-system-nexeyo.herokuapp.com/purchase/product/getSingle/" +
          val,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (res.data.length === 0) {
        alert("PID not found");
      } else {
        setProductName(res.data[0].PName);
      }
    }
  };

  const addpurchaseOrder = () => {
    if (list.length !== 0) {
      localStorage.setItem("PurchaseOrderCart", JSON.stringify(list));
      window.location = "/purchase/order2";
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="topContainer">
          <h1>Add Purchase Order</h1>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Product ID</label>
                <input
                  type="text"
                  value={PID}
                  onChange={(e) => {
                    setPID(e.target.value);
                    checkProduct(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Product Name</label>
                <input type="text" value={productName} disabled />
              </div>
              <div className="formInput">
                <label>Quantity</label>
                <input
                  type="number"
                  min={0}
                  step="1"
                  pattern="[0-9]*"
                  value={qty}
                  onChange={(e) =>
                    setQty((v) =>
                      e.target.validity.valid ? e.target.value : v
                    )
                  }
                />
              </div>
              <div className="formInput">
                <label>Discount</label>
                <input
                  type="number"
                  step="any"
                  min={0}
                  value={discount}
                  onChange={(e) => {
                    setdiscount(e.target.value);
                  }}
                />
              </div>

              <div className="break"></div>
              <button onClick={submitForm}>Add to Cart</button>
            </form>
          </div>
        </div>
        <div className="bottomContainer">
          <div className="right">
            <h1>Cart</h1>
            <table style={{ width: "80%", textAlign: "center" }}>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Discount</th>
              </tr>
              {list.map((item) => {
                return (
                  <tr key={item.PID}>
                    <td>{item.PID}</td>
                    <td> {item.name}</td>
                    <td>{item.qty}</td>
                    <td>{item.discount}</td>
                  </tr>
                );
              })}
            </table>
            {list.length !== 0 && (
              <button
                style={{
                  width: "200px",
                  padding: "10px",
                  border: "none",
                  backgroundColor: "#0085cc",
                  color: " white",
                  fontWeight: "bold",
                  cursor: " pointer",
                  marginTop: "30px",
                  marginLeft: "40%",
                }}
                onClick={addpurchaseOrder}
              >
                Add Purchase Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseOrder1;
