const db = require("../helpers/db");
const query = require("../helpers/mysqlPromise");
const today = require("../helpers/today");
const _ = require("underscore");

//Customer - add,update,getOne,getAll


exports.customerAddController = async (req, res) => {
    const { customerName, paymentTerm, returnTerm, deliveryTerm, no, street, town, branchCode, accountNo, bankName, email } = req.body;
    db.query("insert into Customer(customerName, paymentTerm, returnTerm, deliveryTerm, no, street, town, branchCode, accountNo, bankName, email) values(?,?,?,?,?,?,?,?,?,?,?)", [customerName, paymentTerm, returnTerm, deliveryTerm, no, street, town, branchCode, accountNo, bankName, email], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {

            const id = result.insertId;
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "Add a Customer(CID-" + id + ")"], (err, response) => { });
            res.json("Customer Added");


        }
    })
};


exports.customerUpdateController = async (req, res) => {
    const id = req.params.id;
    const { customerName, paymentTerm, returnTerm, deliveryTerm, no, street, town, branchCode, accountNo, bankName, email } = req.body;
    db.query("update Customer set customerName=? ,paymentTerm=?,returnTerm=?,deliveryTerm=?,no=?,street=?,town=?,branchCode=?,accountNo=?,bankName=?,email=? where CID=?", [customerName, paymentTerm, returnTerm, deliveryTerm, no, street, town, branchCode, accountNo, bankName, email, id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "update a customer(CID-" + id + ")"], (err, response) => { });
            res.json("customer updated");
        }
    })
};


exports.getSingleCustomerController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from Customer where CID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a Customer(CID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    })
};


exports.getAllCustomerController = async (req, res) => {
    db.query("select * from Customer ", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view all Customers "], (err, response) => { });
            res.json(result);
        }
    })
};

//customerContactNumber- add,update,getOne,getAll,delete
exports.customerContactNumberAddController = async (req, res) => {
    const { CID, contactNumber } = req.body;
    db.query("insert into customerContactNumber(CID,contactNumber) values(?,?)", [CID, contactNumber], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {

            const id = result.insertId;
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "Add a Customer contact Number(CCID-" + id + ")"], (err, response) => { });
            res.json("Customer Contact Number Added");


        }
    })
};


exports.customerContactNumberUpdateController = async (req, res) => {
    const id = req.params.id;
    const { CID, contactNumber } = req.body;
    db.query("update customerContactNumber set CID=?,contactNumber=?  where CCID=?", [CID, contactNumber, id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "update a Customer Contact Number(CCID-" + id + ")"], (err, response) => { });
            res.json("Customer Contact Number updated");
        }
    })
};


exports.getSingleCustomerContactNumberController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from customerContactNumber where CCID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a Customer Contact Number(CCID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    })
};


exports.getAllCustomerContactNumbersController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from customerContactNumber where CID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view all Customer Contact Numbers(CID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    })
};

exports.deleteCustomerContactNumberController = async (req, res) => {
    const id = req.params.id;
    db.query("delete from customerContactNumber where CCID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "deleted a Customer Contact Number(CCID-" + id + ")"], (err, response) => { });
            res.json("Customer Contact Number deleted");
        }
    })
};

//customerDeliveryAddress-add,update,getOne,getAll,delete

exports.customerDeliveryAddressAddController = async (req, res) => {
    const { CID, no, street, town } = req.body;
    db.query("insert into customerDeliveryAddress(CID, no, street, town) values(?,?,?,?)", [CID, no, street, town], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {

            const id = result.insertId;
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "Add a Customer Delivery Address(CDAID-" + id + ")"], (err, response) => { });
            res.json("Customer Delivery Address Added");


        }
    })
};


exports.customerDeliveryAddressUpdateController = async (req, res) => {
    const id = req.params.id;
    const { CID, no, street, town } = req.body;
    db.query("update customerDeliveryAddress set CID=?, no=?, street=?, town=?  where CDAID=?", [CID, no, street, town, id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "update a Customer Delivery Address(CDAID-" + id + ")"], (err, response) => { });
            res.json("Customer Delivery Address updated");
        }
    })
};


exports.getSinglecustomerDeliveryAddressController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from customerDeliveryAddress where CDAID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a Customer Delivery Address(CDAID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    })
};


exports.getAllcustomerDeliveryAddresssController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from customerDeliveryAddress where CID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view all Customer Delivery Addresss(CID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    })
};

exports.deletecustomerDeliveryAddressController = async (req, res) => {
    const id = req.params.id;
    db.query("delete from customerDeliveryAddress where CDAID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "deleted a Customer Delivery Address(CDAID-" + id + ")"], (err, response) => { });
            res.json("Customer Delivery Address deleted");
        }
    })
};


//sales order
exports.addSalesOrderController = async (req, res) => {
    const { WID, CID, CDAID, CCID, distance, items } = req.body;
    const products = [];
    let deliveryCharge = 0;
    try {
        r = await query("select * from charges where ID=?", 1);
        deliveryCharge = distance * r[0].amount;
    } catch (e) {
        res.json({ error: e });
        return;
    }

    for (let i = 0; i < items.length; i++) {
        try {
            result = await query("select * from Product where PID=?", [items[i].PID]);
            let discount1 = await query("select * from subCategory where SCID=?", [result[0].SubCatID]);
            let discount2 = await query("select * from discounts where PID=? and CID=?", [items[i].PID, CID]);
            let totDiscount = 0;
            if (!_.isEmpty(discount1)) {
                totDiscount += discount1[0].discount;
            }
            if (!_.isEmpty(discount2)) {
                totDiscount += discount2[0].discount;
            }

            products.push({
                PID: items[i].PID,
                unitPrice: result[0].sellingPrice,
                qty: items[i].qty,
                discount: totDiscount,
                netTot: result[0].sellingPrice * items[i].qty * (100 - totDiscount) / 100,
                name: result[0].PName
            });
        } catch (e) {
            res.json({ error: e });
            return;
        }
    }
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].netTot;
    }
    db.query("insert into SalesOrder(orderDate,total,CID,CDAID,CCID,WID,deliveryCharge,netTotal) values(?,?,?,?,?,?,?,?)", [today, total, CID, CDAID, CCID, WID, deliveryCharge, total + deliveryCharge], (err, result) => {
        if (err) {
            res.json({ error: err });
            return;
        } else {

            const id = result.insertId;
            for (let i = 0; i < products.length; i++) {
                try {
                    query("insert into salesOrderData(PID,salesOrderID,unitPrice,qty,discount,netTot) values(?,?,?,?,?,?)", [products[i].PID, id, products[i].unitPrice, products[i].qty, products[i].discount, products[i].netTot]);
                } catch (e) {
                    res.json({ error: e });
                    return;
                }
            }
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "Add a sales order(salesOrderID-" + id + ")"], (err, response) => { });
            res.json("sales order added");

        }

    });
}

//SalesOrder-view all,view one
//SalesOrderData-view one(related to a sales order)

exports.getSingleSalesOrderController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from SalesOrder where salesOrderID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a sales order(salesOrderID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    });
}

exports.getAllSalesOrderController = async (req, res) => {
    db.query("select * from SalesOrder ", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view all sales orders"], (err, response) => { });
            res.json(result);
        }
    });
}


exports.getSingleSalesOrderDataController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from salesOrderData where salesOrderID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a SalesOrderData(salesOrderID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    });
}

//sales Return order
exports.addSalesReturnOrderController = async (req, res) => {
    const { WID, CID, CDAID, CCID, reason, salesOrderID, items } = req.body;
    const products = [];


    for (let i = 0; i < items.length; i++) {
        try {
            result = await query("select * from Product where PID=?", [items[i].PID]);
            let discount1 = await query("select * from subCategory where SCID=?", [result[0].SubCatID]);
            let discount2 = await query("select * from discounts where PID=? and CID=?", [items[i].PID, CID]);
            let totDiscount = 0;
            if (!_.isEmpty(discount1)) {
                totDiscount += discount1[0].discount;
            }
            if (!_.isEmpty(discount2)) {
                totDiscount += discount2[0].discount;
            }

            products.push({
                PID: items[i].PID,
                unitPrice: result[0].sellingPrice,
                qty: items[i].qty,
                discount: totDiscount,
                netTot: result[0].sellingPrice * items[i].qty * (100 - totDiscount) / 100,
                name: result[0].PName
            });
        } catch (e) {
            res.json({ error: e });
            return;
        }
    }
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += products[i].netTot;
    }
    db.query("insert into SalesReturnOrder(initiateDate,total,CID,CDAID,CCID,WID,reason,salesOrderID) values(?,?,?,?,?,?,?,?)", [today, total, CID, CDAID, CCID, WID, reason, salesOrderID], (err, result) => {
        if (err) {
            res.json({ error: err });
            return;
        } else {
            const id = result.insertId;
            for (let i = 0; i < products.length; i++) {
                try {
                    query("insert into salesReturnOrderData(PID,salesReturnOrderID,unitPrice,qty,discount,netTot) values(?,?,?,?,?,?)", [products[i].PID, id, products[i].unitPrice, products[i].qty, products[i].discount, products[i].netTot]);
                } catch (e) {
                    res.json({ error: e });
                    return;
                }
            }
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "Add a sales Return order(salesReturnOrderID-" + id + ")"], (err, response) => { });
            res.json("sales Return order added");

        }

    });
}

//SalesReturnOrder-view all,view one
//SalesReturnOrderData-view one(related to a sales order)

exports.getSingleSalesReturnOrderController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from SalesReturnOrder where salesReturnOrderID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a sales return order(salesReturnOrderID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    });
}

exports.getAllSalesReturnOrderController = async (req, res) => {
    db.query("select * from SalesReturnOrder ", (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view all sales Return orders"], (err, response) => { });
            res.json(result);
        }
    });
}


exports.getSingleSalesReturnOrderDataController = async (req, res) => {
    const id = req.params.id;
    db.query("select * from salesReturnOrderData where salesReturnOrderID=?", [id], (err, result) => {
        if (err) {
            res.json({ error: err });
        } else {
            db.query("insert into activity(IP,userId,userName,log) values(?,?,?,?)", [req.ip, req.user.id, req.user.username, "view a salesReturnOrderData(salesReturnOrderID-" + id + ")"], (err, response) => { });
            res.json(result);
        }
    });
}