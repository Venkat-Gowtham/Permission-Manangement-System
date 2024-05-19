import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Modal,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const Modal = () => {
  const [modal_standard, setmodal_standard] = useState(false)
  const [modal_large, setmodal_large] = useState(false)
  const [modal_xlarge, setmodal_xlarge] = useState(false)
  const [modal_small, setmodal_small] = useState(false)
  const [modal_center, setmodal_center] = useState(false)
  const [modal_scroll, setmodal_scroll] = useState(false)
  const [modal_fullscreen, setmodal_fullscreen] = useState(false)
  const [modal_backdrop, setmodal_backdrop] = useState(false)

  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop)
    removeBodyCss()
  }
  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }
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
                      <p className="text-muted">Static backdrop
                                                modal</p>
                      <button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        onClick={() => {
                          tog_backdrop()
                        }}
                        data-toggle="modal"
                      >
                        Static backdrop modal
                          </button>
                      <Modal
                        isOpen={modal_backdrop}
                        toggle={() => {
                          tog_backdrop()
                        }}
                        scrollable={true}
                        id="staticBackdrop"
                      >
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                          <button type="button" className="btn-close"
                            onClick={() => {
                              setmodal_backdrop(false)
                            }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                          <p>I will not close if you click outside me. Don't even try to press escape key.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-light" onClick={() => {
                            setmodal_backdrop(false)
                          }}>Close</button>
                          <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                      </Modal>
                    </div>

                  </Col>
                  <Col sm={6} md={4} xl={3}>
                    <div className="my-4 text-center">
                      <p className="text-muted">Full Screen</p>
                      <button
                        type="button"
                        onClick={() => {
                          tog_fullscreen()
                        }}
                        className="btn btn-primary waves-effect waves-light"
                        data-toggle="modal"
                      >
                        Fullscreen Modal
                          </button>
                    </div>
                    <Modal
                      size="fullscreen"
                      isOpen={modal_fullscreen}
                      toggle={() => {
                        tog_fullscreen()
                      }}
                    >
                      <div className="modal-header">
                        <h5
                          className="modal-title mt-0"
                          id="myExtraLargeModalLabel"
                        >
                          Fullscreen modal
                            </h5>
                        <button
                          onClick={() => {
                            setmodal_fullscreen(false)
                          }}
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>

                      </div>
                    </Modal>

                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  )
}

export default Modal
