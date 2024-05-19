import React, {useEffect, useState} from "react"
import { Row, Col, CardBody, Card, Progress } from "reactstrap"
import { Link } from "react-router-dom"

//Import Components
import LineChart from "./line-chart"
import RevenueChart from "./revenue-chart"
import SalesAnalytics from "./sales-analytics"
import ScatterChart from "./scatter-analytics"
import LatestTransaction from "./latest-transaction"

//Import Image
import widgetImage from "../../assets/images/widget-img.png"
import Overview from "./Overview";
import Reviews from './Reviews';
import Revenue from './Revenue';
import Inbox  from './Inbox';
import LineColumnArea from "../AllCharts/apex/LineColumnArea";
import axios from "axios"
const axiosAPI = axios.create()
const Dashboard = () =>{

  
  const [data, setTableData] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Fetch data from backend when the component mounts
    fetchTableData();
}, []);
// let total = 0;
const fetchTableData = async () => {
    try {
        axiosAPI.get("http://localhost:5000/api/getallpermissions")
        .then((res)=>{
            if(res.status === 200){
                //console.log(data);
                setTableData(res.data);
                //alert("data receieved");
                setTotal(parseInt(res.data.pendingCount) + parseInt(res.data.deniedCount))
            }
            else{
                    alert("data not received")
            }
        })
    } catch (error) {
        console.error("Error fetching data:", error);
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
              <h4 className="page-title mb-0 font-size-18">Dashboard</h4>

              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item active">Welcome to Dashboard</li>
                </ol>
              </div>

            </div>
          </div>
        </Row>

        <Row>
          <Col lg={3}>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-tag-plus-outline"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Pending{total}</div>
                  </div>
                </div>
                <h4 className="mt-4">{data.pendingCount ? data.pendingCount : 0 }</h4>
                <div className="row">
                  <div className="col-7">
                    {
                    total == 0 ? 
                    (<p className="mb-0"><span className="text-success me-2"> 0% <i
                      className="mdi mdi-arrow-up"></i> </span></p>)
                      : (<p className="mb-0"><span className="text-success me-2"> {(data.pendingCount/total)*100}% <i
                      className="mdi mdi-arrow-up"></i> </span></p>)
                    }
                  </div>
                  <div className="col-5 align-self-center">

                    <Progress
                      value={(data.pendingCount/total)*100}
                      color="primary"
                      className="bg-transparent progress-sm"
                      size="sm"
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <div className="d-flex align-items-start">
                  <div className="avatar-sm font-size-20 me-3">
                    <span className="avatar-title bg-soft-primary text-primary rounded">
                      <i className="mdi mdi-account-multiple-outline"></i>
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-size-16 mt-2">Accepted</div>

                  </div>
                </div>
                <h4 className="mt-4">{data.deniedCount ? data.deniedCount : 0 }</h4>
                <Row>
                  <div className="col-7">
                    {/* <p className="mb-0"><span className="text-success me-2"> 0.16% <i
                      className="mdi mdi-arrow-up"></i> </span></p> */}
                      {
                    total == 0 ? 
                    (<p className="mb-0"><span className="text-success me-2"> 0% <i
                      className="mdi mdi-arrow-up"></i> </span></p>)
                      : (<p className="mb-0"><span className="text-success me-2"> {(data.deniedCount/total)*100}% <i
                      className="mdi mdi-arrow-up"></i> </span></p>)
                    }
                  </div>
                  <div className="col-5 align-self-center">
                    <Progress
                      value={(data.deniedCount/total)*100}
                      color="success"
                      className="bg-transparent progress-sm"
                      size="sm"
                    />
                  </div>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg={6}>
            <LineChart />

          </Col>
          <Col lg={3}>
            <RevenueChart />
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <SalesAnalytics />
          </Col>
          <Col lg={4}>
            <ScatterChart />
          </Col>

          <Col lg={3}>
            {/* <Card className="bg-primary">
              <CardBody>
                <div className="text-white">
                  <h5 className="text-white">2400 + New Users</h5>
                  <p>At vero eos et accusamus et iusto odio dignissimos ducimus</p>
                  <div>
                    <Link to="#" className="btn btn-outline-success btn-sm">View more</Link>
                  </div>
                </div>
                <Row className="justify-content-end">
                  <div className="col-8">
                    <div className="mt-4">
                      <img src={widgetImage} alt=""
                        className="img-fluid mx-auto d-block" />
                    </div>
                  </div>
                </Row>
              </CardBody>
            </Card> */}
          </Col>
        </Row>
        <Row>
          <Overview />
          <Reviews />
          <Revenue />
        </Row>

        <Row>
          <Inbox />
          {/* <LatestTransaction /> */}
        </Row>

      </div>
    </React.Fragment>
  )
}

export default Dashboard