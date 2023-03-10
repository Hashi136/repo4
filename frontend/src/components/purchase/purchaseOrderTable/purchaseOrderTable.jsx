import "../table.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

function getFullAddress(params) {
  return `${params.row.no || ""}, ${params.row.street || ""} ,${
    params.row.town || ""
  } ,${params.row.country}`;
}

const userColumns = [
  { field: "purchaseOrderID", headerName: "Purchase Order ID", width: 150 },
  { field: "orderDate1", headerName: "Order Date", width: 100 },
  { field: "status", headerName: "Status", width: 100 },
  { field: "total", headerName: "Net Total", width: 100 },

  { field: "sName", headerName: "Supplier Name", width: 150 },
  // { field: "SSLID", headerName: "Supplier Store Location ID", width: 185},
  {
    field: "SSLID",
    headerName: "Delivery Address",
    valueGetter: getFullAddress,
    width: 300,
  },

  //{ field: "SCID", headerName: "Supplier Contact ID", width: 150},
  { field: "contactNumber", headerName: "Supplier Contact No", width: 150 },

  { field: "deliveredDate1", headerName: "Finished Date", width: 100 },
];

const PurchaseOrderTable = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get(
        "https://erp-system-nexeyo.herokuapp.com/purchase/purchaseOrder/getAll",
        {
          withCredentials: true,
          credentials: "include",
        }
      )
      .then((res) => {
        // let dt = res.data.map((d) => {
        //   return { id: d.purchaseOrderID, ...d };
        //});
        // setData(dt);

        let dtt = res.data.map((d) => {
          return {
            id: d.purchaseOrderID,
            orderDate1: moment(d.orderDate)
              .add(1, "days")
              .utc()
              .format("YYYY/MM/DD"),
            deliveredDate1: moment(d.deliveredDate)
              .add(1, "days")
              .utc()
              .format("YYYY/MM/DD"),
            ...d,
          };
        });
        setData(dtt);
      });
  }, [""]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const upLink = "/purchase/vieworderdata/" + params.row.purchaseOrderID;
        return (
          <div className="cellAction">
            <Link to={upLink} style={{ textDecoration: "none" }}>
              <div className="viewButtons">View Order Details</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="TableOfData" style={{ height: "78%" }}>
      <div className="TableOfDataTitle1">
        <h1>All Purchase Orders</h1>
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

export default PurchaseOrderTable;
