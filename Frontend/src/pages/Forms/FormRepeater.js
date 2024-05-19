import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Label,
  Input,
  FormGroup,
  Col,
  Row,
  Card,
  CardBody,
  Button,
  CardTitle,
} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
const axiosAPI = axios.create();
const TasksCreate = () => {
  const data =
  {
    Name: "",
    Roll: "",
    TrainerName:"",
    TrainerId:"",
    Phone: "",
    College: "",
    Batch: "",
    file: "",
    Date:"",
    Reason: "",
  }
    ;

  const [inputFields, setInputFields] = useState(data);
  const [startDate, setStartDate] = useState(new Date());
  // const [startDate, setStartDate] = useState('');

  const handleDate=(data)=>{
    setStartDate(data);
  }

  const handleChange = (event) => {
    const value =  (event.target.value);
    // if(event.target.value === )
    setInputFields({ ...inputFields, [event.target.name]: value });
  };




  const handleSubmit = (event) => {
    event.preventDefault();
    // axiosAPI.get("/testing")
    // inputFields[data].
    const dateString = startDate;
const dateObject = new Date(dateString);
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
const formattedDate = dateObject.toLocaleDateString(undefined, options);
    inputFields.Date = formattedDate;
    console.log(inputFields);
    axiosAPI.post("http://localhost:5000/api/RequestPermission", inputFields)
      .then((res) => {
        if (res.status === 200) alert("send")
        else alert("NOt Sentttttttt")
      })
      .catch((err) => {
        console.log(err)
      })
};


  return (
    <>
      <div className="page-content">
        {/* Render Breadcrumbs */}
        <Breadcrumbs title="Tasks" breadcrumbItem="Create Task" />

        <Row>
          <Col lg="12">
            <Card>
              <CardBody>
                <CardTitle className="mb-4">Request Form </CardTitle>
                <form className="outer-repeater">
                  <div data-repeater-list="outer-group" className="outer">
                    <div data-repeater-item className="outer">
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Name
                        </Label>
                        <Col lg="10">
                          <Input
                            id="name"
                            name="Name"
                            type="text"
                            placeholder="Enter Your Name"
                            className="form-control"
                            value={inputFields.Name}
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Roll number
                        </Label>
                        <Col lg="10">
                          <Input
                            id="email"
                            name="Roll"
                            type="text"
                            placeholder="Enter your Roll"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup> <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Trainer Name 
                        </Label>
                        <Col lg="10">
                          <Input
                            id="text"
                            name="Trainer name"
                            type="text"
                            placeholder="Enter your Trainer Name"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup> <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                        Trainer Id 
                        </Label>
                        <Col lg="10">
                          <Input
                            id="email"
                            name=" Trainer Id "
                            type="text"
                            placeholder="Enter your Trainer Id "
                            className="form-control"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="Phone"
                          className="col-form-label col-lg-2"
                        >
                          Phone number
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="Phone"
                            type="number"
                            placeholder="Enter Your number"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Select College
                        </Label>
                        <Col lg="10">
                          <select
                            className="form-control"
                            name="College"
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="AEC">
                              AEC
                            </option>
                            <option value="ACET">
                              ACET
                            </option>
                            <option value="ACOE">ACOE</option>
                          </select>
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Batch
                        </Label>
                        <Col lg="10">
                          <select
                            className="form-control"
                            name="Batch"
                            onChange={handleChange}
                          >
                            <option value="">Select</option>
                            <option value="FN">
                              FN
                            </option>
                            <option value="AN">AN</option>
                          </select>
                        </Col>
                      </FormGroup><FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Date
                        </Label>
                        <Col lg="10">
                        <DatePicker
                            selected={startDate}
                            onChange={handleDate}
                            className="form-control"
                          />
                        </Col>
                      </FormGroup> <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          File
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="File"
                            type="file"
                            placeholder="Upload your filr"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup> <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                          Reason
                        </Label>
                        <Col lg="10">
                          <Input
                            id="taskbudget"
                            name="Reason"
                            type="text"
                            placeholder="Enter your reason"
                            className="form-control"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="mb-4" row>
                        <Label
                          htmlFor="taskbudget"
                          className="col-form-label col-lg-2"
                        >
                        </Label>
                        <Col lg="10">
                          <Button
                            onClick={handleSubmit}
                            type="submit"
                            color="primary"
                          >
                            Submit
                          </Button>
                        </Col>
                      </FormGroup>

                    </div>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TasksCreate;