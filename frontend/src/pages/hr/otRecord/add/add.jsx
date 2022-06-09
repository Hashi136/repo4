import "./add.scss";
import { useState, useEffect } from "react";
import Navbar from "../../../../components/navbar/Navbar";
import Sidebar from "../../../../components/hr/sidebar/Sidebar";
import axios from "axios";

const AddOtRecord = () => {
  const [EID, setEID] = useState("");
  const [NIC, setNIC] = useState("");
  const [otType, setOtType] = useState("");
  const [hours, setHours] = useState(0);
  const [OtTypes, setOtTypes] = useState({});

  useEffect(() => {
    const getOtTypes = async () => {
      const res = await axios.get("http://localhost:5000/hr/otType/getAll", {
        withCredentials: true,
        credentials: "include",
      });
      setOtTypes(res.data);
    };
    getOtTypes();
  }, [""]);

  const submitForm = (e) => {
    e.preventDefault();
    if (EID === "" || NIC === "" || otType === "" || hours <= 0) {
      alert("Please fill all required fields");
      console.log(EID);
      console.log(NIC);
      console.log(hours);
      console.log(otType);
    } else {
      let data = {
        EID: EID,
        otID: otType,
        hours: hours,
      };

      axios
        .post("http://localhost:5000/hr/ot/add", data, {
          withCredentials: true,
          credentials: "include",
        })
        .then((res) => {
          console.log(res);
          if (res.data === "OT Added") {
            alert("OT Added");
            setEID("");
            setNIC("");
            setHours(0);
            setOtType("");
          } else {
            alert("Sorry,Try again");
          }
        });
    }
  };

  const checkEmployee = async (val) => {
    if (val !== "") {
      const res = await axios.get(
        "http://localhost:5000/hr/employee/getSingle/" + val,
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (res.data.length === 0) {
        alert("EID not found");
      } else {
        setNIC(res.data[0].NIC);
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add OT Record</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>EID*</label>
                <input
                  type="text"
                  value={EID}
                  onChange={(e) => {
                    setEID(e.target.value);
                    checkEmployee(e.target.value);
                  }}
                />
              </div>
              <div className="formInput">
                <label>Employee NIC*</label>
                <input
                  type="text"
                  disabled
                  value={NIC}
                  onChange={(e) => {
                    setNIC(e.target.value);
                  }}
                />
              </div>

              <div className="formInput">
                <label>OT Type*</label>

                <select
                  value={otType}
                  onChange={(e) => {
                    setOtType(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    select OT Type
                  </option>
                  {JSON.stringify(OtTypes) !== "{}"
                    ? OtTypes.map((ot) => (
                        <option value={ot.otID} key={ot.otID}>
                          {ot.type}
                        </option>
                      ))
                    : ""}
                </select>
              </div>

              <div className="formInput">
                <label>Hours*</label>
                <input
                  type="number"
                  step="any"
                  value={hours}
                  onChange={(e) => {
                    setHours(e.target.value);
                  }}
                />
              </div>

              <div className="break"></div>
              <button onClick={submitForm}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddOtRecord;