import React from "react";
import { Row, Col, Card, CardBody, Modal } from "reactstrap";
import { useEffect } from "react";
import axios from "axios";
// Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const UIModal = ({ isOpen, toggleModal, data}) => {

  const image=()=>[
    <img src={data.image} alt="image not found"/>
  ]
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumbs title="UI Elements" breadcrumbItem="Modals" />
        <Row>
          <Col className="col-12">
            <Card>
              <CardBody>
                <Row>
                  <Col sm={6} md={4} xl={3}>
                    <div className="my-4 text-center">
                      <p className="text-muted">Static backdrop modal</p>
                      <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={toggleModal} // Add onClick event to trigger the modal
                      >
                        View
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modal component */}
      <Modal isOpen={isOpen} toggle={toggleModal} scrollable={true} id="staticBackdrop">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title"> {data.Roll}</h5>
          <h5 className={`badge badge-soft-${data.Batch === "FN" ? "success" : "warning"} font-size-12`}> {data.Batch}</h5>

            <button type="button" className="btn-close" onClick={toggleModal}></button>
          </div>
          <div className="modal-body">
          <h5 className="modal-title">{data.Name}</h5>
            <span>{data.Year}</span> <span>{data.Branch}  {data.College}</span>
            <p>{data.Reason}</p>
          </div>
          <div className="modal-footer">
          <button style={{marginRight:"200px"}} type="button" className="btn btn-primary" onClick={()=>image}>Attachment</button>
            <button type="button" className="btn btn-secondary" onClick={toggleModal}>Deny</button>
            <button type="button" className="btn btn-primary" >Grant </button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default UIModal;
