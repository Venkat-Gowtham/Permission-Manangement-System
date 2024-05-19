import React, { useState, useEffect } from "react";
import { Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import UIModal from "../Ui/UiModal";
// import { fetchDataFromBackend, updateEntryInBackend, deleteEntryInBackend } from "./api"; // Import your backend API functions here

const LatestTransaction = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [curRow, setRow] = useState([]);
    const [tableData, setTableData] = useState([
        {
                Date:'23-4-2024',
                Roll:"21P31A0542",
                Name:"Gowtham Varri",
                Year:"III",
                Status : "Pending" ,
                Batch:"FN",
                Reason:"going to sister's marriage "

       },
        {
            Date:'23-4-2024',
            Roll:"21P31A0542",
            Name:"Gowtham Varri",
            Year:"III",
            Status : "Pending" ,
            Batch:"FN",
            Reason:"going to sister's marriage "
        },
        {
            Date:'23-4-2024',
            Roll:"21P31A0542",
            Name:"Gowtham Varri",
            Year:"III",
            Status : "Pending" ,
            Batch:"FN",
            Reason:"going to sister's marriage "
        },
        {
            Date:'23-4-2024',
            Roll:"21P31A0542",
            Name:"Gowtham Varri",
            Year:"III",
            Status : "Pending" ,
            Batch:"AN",
            Reason:"going to sister's marriage "
        },

    ]);

    useEffect(() => {
        // Fetch data from backend when the component mounts
        fetchTableData();
    }, []);

    const fetchTableData = async () => {
        try {
            axios.post("http://localhost:5000/", { Status:"Pending"})
            .then((res)=>{
                if(res.status === 200){
                    console.log(data);
                    setTableData(res.data);
                    alert("data receieved");
                }
                else{
                        alert("data not received")
                }
            })
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const toggleModal = (curRow) => {
        setIsModalOpen(!isModalOpen);
        setRow(curRow);
    };

    const handleGrantPermission = async () => {
        try {
            // Update entry in backend to mark permission as granted
            await updateEntryInBackend(curRow.id, "Granted"); // Implement this function in your API file
            // Refetch data to update the table
            fetchTableData();
        } catch (error) {
            console.error("Error granting permission:", error);
        }
    };

    const handleDenyPermission = async () => {
        try {
            // Delete entry in backend
            await deleteEntryInBackend(curRow.id); // Implement this function in your API file
            // Refetch data to update the table
            fetchTableData();
            // Close modal
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error denying permission:", error);
        }
    };

    return (
        <Col lg={12}>
            <Card>
                <CardBody>
                    <CardTitle className="h4 mb-4">Student List</CardTitle>
                    <div className="table-responsive">
                        <Table className="table-centered">
                            <thead>
                                <tr>
                                    <th scope="col">Date</th>
                                    <th scope="col">Id no.</th>
                                    <th scope="col">Student Name</th>
                                    <th scope="col">Year</th>
                                    <th scope="col" colSpan="2">Acceptance Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.map((rowData, index) => (
                                    <tr key={index}>
                                        <td>{rowData.Date}</td>
                                        <td>
                                            <Link to="#" className="text-body fw-medium">{rowData.Roll}</Link>
                                        </td>
                                        <td>{rowData.Name}</td>
                                        <td>{rowData.Year}</td>
                                        <td><span className={`badge badge-soft-${rowData.Status === "Allowed" ? "success" : rowData.Status === "Denied" ? "danger" : "warning"} font-size-12`}>{rowData.status}</span></td>
                                        <td><button className="btn btn-primary btn-sm" onClick={() => toggleModal(rowData)}>View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

                    <div className="mt-3">
                        <Pagination className="pagination pagination-rounded justify-content-center mb-0">
                            <PaginationItem>
                                <PaginationLink to="#">Previous</PaginationLink>
                            </PaginationItem>
                            <PaginationItem><PaginationLink to="#">1</PaginationLink></PaginationItem>
                            <PaginationItem className="active"><PaginationLink to="#">2</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink to="#">3</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationLink to="#">Next</PaginationLink></PaginationItem>
                        </Pagination>
                    </div>
                </CardBody>
            </Card>
            <UIModal isOpen={isModalOpen} toggleModal={toggleModal} data={curRow}>
                <Button color="primary" onClick={handleGrantPermission}>Grant</Button>
                <Button color="danger" onClick={handleDenyPermission}>Deny</Button>
            </UIModal>
        </Col>
    );
}

export default LatestTransaction;
