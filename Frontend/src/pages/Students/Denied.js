import React, { useState, useEffect } from "react";
import { Row,Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Button } from "reactstrap";
import { Link } from "react-router-dom";
import UIModal from "../Ui/UiModal";
import axios from "axios";


const axiosAPI = axios.create()
const Dashboard = () =>{
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [curRow, setRow] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        // Fetch data from backend when the component mounts
        fetchTableData();
    }, []);

    const fetchTableData = async () => {
        try {
            axiosAPI.post("http://localhost:5000/api/getAcceptorDeniedList",{flag:0})
            .then((res)=>{
                if(res.status === 200){
                    console.log(res.data.data);
                    setTableData(res.data.data);
                }
                else{
                        console.log("Not receieved")
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

    const handleGrantPermission = async (rowData) => {
      let Roll = rowData.Roll
      console.log(Roll)
        try {
           axiosAPI.post("http://localhost:5000/api/updateStatus",{Roll:Roll,flag:1})
           .then((res)=>{
            if(res.status === 200){
              // console.log(res.data.data);
              // setTableData(res.data.data);
              // alert("data receieved");
              // delete column------------------------------------------------------
              console.log(res.data)
          }
          else{
                 alert('cant accpet')
          }
           })
        } catch (error) {
            console.error("Error granting permission:", error);
        }
    };

    const handleDenyPermission = async () => {
        try {
            axiosAPI.post('http://localhost:5000/api/updateStatus',{Roll:Roll,flag:0})
            .then((res)=>{
              if(res.status === 200){
                /// delete columnn

              }
              else alert('cant accpet')
                 
            })
        } catch (error) {
            console.error("Error denying permission:", error);
        }
    };

  return (
    <React.Fragment>
      <div className="page-content">
        {/* <Row>
        <Card>
              <CardBody>
                <CardTitle className="h4 mb-4">
                  Line, Column & Area Chart{" "}
                </CardTitle>
                <LineColumnArea />
              </CardBody>
            </Card>
          </Row>     */}

        
<Row>
          <div className="col-12">
            <div className="page-title-box d-flex align-items-center justify-content-between">
              <h4 className="page-title mb-0 font-size-18">Students</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active"></li>
                </ol>
              </div>

            </div>
          </div>
        </Row>
        <Row>
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
                                    <th scope="col">Phone</th>
                                    <th scope="col" colSpan="2"> Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData.length && tableData.map((rowData, index) => (
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
        </Row>

      </div>
    </React.Fragment>
  )
}

export default Dashboard