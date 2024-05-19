import React, { useState } from "react";
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

// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import axios from "axios";
const axiosAPI = axios.create();

const TasksCreate = () => {
    const initialInputFields = {
        TrainerName: "",
        TrainerId: "",
        Password:""
    };

    const [inputFields, setInputFields] = useState(initialInputFields);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputFields({ ...inputFields, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputFields);
        axiosAPI.post("http://localhost:5000/api/createUser", inputFields)
            .then((res) => {
                if (res.status === 200) {
                    alert("Send");
                } else {
                    alert("Not Sent");
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
                                <CardTitle className="mb-4">Request Form</CardTitle>
                                <form className="outer-repeater">
                                    <div data-repeater-list="outer-group" className="outer">
                                        <div data-repeater-item className="outer">
                                            <FormGroup className="mb-4" row>
                                                <Label
                                                    htmlFor="taskbudget"
                                                    className="col-form-label col-lg-2"
                                                >
                                                    Trainer Name
                                                </Label>
                                                <Col lg="10">
                                                    <Input
                                                        id="text"
                                                        name="TrainerName"
                                                        type="text"
                                                        placeholder="Enter your Trainer Name"
                                                        className="form-control"
                                                        value={inputFields.TrainerName}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label
                                                    htmlFor="taskbudget"
                                                    className="col-form-label col-lg-2"
                                                >
                                                    Trainer Id
                                                </Label>
                                                <Col lg="10">
                                                    <Input
                                                        id="email"
                                                        name="TrainerId"
                                                        type="text"
                                                        placeholder="Enter your Trainer Id"
                                                        className="form-control"
                                                        value={inputFields.TrainerId}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label
                                                    htmlFor="taskbudget"
                                                    className="col-form-label col-lg-2"
                                                >
                                                    Password
                                                </Label>
                                                <Col lg="10">
                                                    <Input
                                                        id="email"
                                                        name="Password"
                                                        type="password"
                                                        placeholder="create your password"
                                                        className="form-control"
                                                        value={inputFields.Password}
                                                        onChange={handleChange}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup className="mb-4" row>
                                                <Label
                                                    htmlFor="taskbudget"
                                                    className="col-form-label col-lg-2"
                                                ></Label>
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
