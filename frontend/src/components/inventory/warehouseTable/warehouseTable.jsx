import "../table.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function getAddress(params) {
  return `${params.row.no || ""}, ${params.row.street || ""}, ${
    params.row.town || ""
  }`;
}

const userColumns = [
  { field: "WID", headerName: "Warehouse ID", width: 150 },
  { field: "ManagerName", headerName: "Name of the Manager", width: 200 },
  {
    field: "address",
    headerName: "Address",
    valueGetter: getAddress,
    width: 300,
  },
  // { field: "no", headerName: "No", width: 150 },
  // { field: "street", headerName: "Street", width: 200},
  // { field: "town", headerName: "Town", width: 200},
];

const WarehouseTable = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://erp-system-nexeyo.herokuapp.com/inventory/Warehouse/getAll",
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          return { id: d.WID, ...d };
        });
        setData(dt);
        // console.log(dt);
      });
  }, [""]);

  const actionColumn = [
    {
      headerName: "Action",
      width: 350,
      renderCell: (params) => {
        const reLink1 = "/inventory/warehouse/stockDetails/" + params.row.WID;
        const reLink2 = "/inventory/warehouse/editDetails/" + params.row.WID;
        return (
          <div className="cellAction">
            <Link to={reLink2} style={{ textDecoration: "none" }}>
              <div className="editButtons">Edit</div>
            </Link>
            <Link to={reLink1} style={{ textDecoration: "none" }}>
              <div className="viewButtons">View Stock</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable" style={{ height: "78%" }}>
      <div className="dataTableTitle1">
        <h1>Warehouse Details</h1>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default WarehouseTable;
