import "../table.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const userColumns = [
  { field: "salesOrderID", headerName: "Sales Order ID",  width: 100},
  { field: "WID", headerName: "Warehouse ID", width: 100},
  { field: "CID", headerName: "Customer ID", width: 100},
  { field: "orderDate", headerName: "Order Date", width: 200 },
  { field: "total", headerName: "total", width: 100 },
  { field: "deliveryCharge", headerName: "Delivery Charge", width: 100},
  { field: "netTotal", headerName: "Net Total", width: 100},
  { field: "statusMod", headerName: "Status", width: 100 },
  { field: "deliveredDate", headerName: "Delivered Date", width: 200},
];

const SalesOrderTable = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory/salesOrder/getAll", {
        withCredentials: true,
        credentials: "include",
      })
      .then((res) => {
        // console.log(res);
        let dt = res.data.map((d) => {
          let status;
          switch (d.status) {
            case "P":
              status="Pending"
              break;
            case "D":
              status="Delivered"
              break;
          }
          return { id: d.salesOrderID,statusMod:status, ...d };
        });
        setData(dt);
        // console.log(dt);
      });
  }, [""]);

  const actionColumn = [
    {
      headerName: " ",
      width: 300,
      renderCell: (params) => {
        const reLink2= "/inventory/order/salesOrders/orderData/"+params.row.salesOrderID;
        return (
          <div className="cellAction">
            <Link to={reLink2} style={{ textDecoration: "none" }}>
              <div className="viewButton">View Order</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="dataTableTitle">
        Sales Orders
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

export default SalesOrderTable;