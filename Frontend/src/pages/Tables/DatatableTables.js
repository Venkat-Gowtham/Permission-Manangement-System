import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle ,Table } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const DatatableTables = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedDate = urlParams.get('date');
        console.log(selectedDate)
        if (selectedDate) {
          alert(selectedDate)
            axios.get("http://localhost:5000/api/getdata", { date: selectedDate })
                .then((res) => {
                    if (res.status === 200) {
                      setData(res.data.data)
                        // setData({
                        //     // columns: data.columns, // Keep columns as it is
                        //     // rows: res.data.isther // Update rows with fetched data

                        // });
                        alert("hii")
                    } else {
                        console.log("No data found");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, []); // Execute only once on component mount

    return (
        <React.Fragment>
            <div className="page-content">
                <Breadcrumbs title="Tables" breadcrumbItem="Data Tables" />
                <Row>
                    <Col className="col-12">
                        <Card>
                            <CardBody>
                                <CardTitle>Default Datatable</CardTitle>
                                <CardSubtitle className="mb-3">
                                    mdbreact DataTables has most features enabled by default, so
                                    all you need to do to use it with your own tables is to call
                                    the construction function:{" "}
                                    <code>&lt;MDBDataTable /&gt;</code>.
                                </CardSubtitle>
                                <div className="table-responsive">
                        <Table className="table-centered">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Id no.</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col" colSpan="2"> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length && data.map((rowData, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <Link to="#" className="text-body fw-medium">{rowData.Roll}</Link>
                                        </td>
                                        <td>{rowData.Name}</td>
                                        <td>{rowData.Phone}</td>
                                        {/* <td><button className="btn btn-primary btn-sm" onClick={() => toggleModal(rowData)}>View</button></td> */}
                                        <td><span className={`badge badge-soft-${rowData.Status === "Accepted" ? "success" : rowData.Status === "Denied" ? "danger" : "warning"} font-size-12`}>{rowData.Status}</span></td>
                                        {/* <td><button style={{marginRight:"10px"}} className="btn btn-success btn-sm" onClick={() => handleGrantPermission(rowData)}>Accept</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDenyPermission(rowData)}>Deny</button></td> */}
                                        <td></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                                {/* <MDBDataTable responsive bordered data={data} /> */}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    );
}

export default DatatableTables;
