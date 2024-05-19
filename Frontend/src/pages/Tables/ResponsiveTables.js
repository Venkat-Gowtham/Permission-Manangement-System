import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";

const ResponsiveTables = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/getdata", {
          date: localStorage.getItem("datee")
        });
        setData(response.data.isther);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="Tables" breadcrumbItem="Responsive Table" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <CardTitle className="h4">Example</CardTitle>
                <p className="card-title-desc">
                  This is an experimental awesome solution for responsive tables with complex data.
                </p>
                <div className="table-rep-plugin">
                  <div className="table-responsive mb-0" data-pattern="priority-columns">
                    <Table id="tech-companies-1" className="table table-striped table-bordered">
                      <Thead>
                        <Tr>
                          <Th data-priority="1">Name</Th>
                          <Th data-priority="3">Roll Number</Th>
                          <Th data-priority="1">Batch</Th>
                          <Th data-priority="3">College</Th>
                          <Th data-priority="3">Phone</Th>
                          <Th data-priority="6">Date</Th>
                          <Th data-priority="6">Reason</Th>
                          <Th data-priority="6">1y Target Est</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {loading ? (
                          <Tr>
                            <Td>Loading...</Td>
                          </Tr>
                        ) : (
                          data.map((item, index) => (
                            <Tr key={index}>
                              <Td>{item.Company}</Td>
                              <Td>{item.Name}</Td>
                              <Td>{item.Roll}</Td>
                              <Td>{item.Batch}</Td>
                              <Td>{item.College}</Td>
                              <Td>{item.Phone}</Td>
                              <Td>{item.Date}</Td>
                              <Td>{item.Reason}</Td>
                              <Td>{item.TargetEst}</Td>
                            </Tr>
                          ))
                        )}
                      </Tbody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default ResponsiveTables;
