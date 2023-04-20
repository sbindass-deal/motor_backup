import React from "react";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Analytics from "./Analytics";
import Mitsubishi from "../../../Assets/images/Mitsubishi.webp";
import Mitsubishi_300 from "../../../Assets/images/land_rover_range_rover.webp"

function AnalyticsTab() {
  return (
    <section className="ptb_80 pt_sm_50">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center pb_30 TbAanaletics">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col sm={2}>
                  <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="first">
                        <div className="carImg">
                          <img src={Mitsubishi} />
                          <p>Mitsubishi 3000GT</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="second">
                      <div className="carImg">
                          <img src={Mitsubishi_300} />
                          <p>Mitsubishi 3000GT</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="three">
                      <div className="carImg">
                          <img src={Mitsubishi} />
                          <p>Mitsubishi 3000GT</p>
                        </div>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="first">
                      <Analytics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                      <Analytics />
                    </Tab.Pane>
                    <Tab.Pane eventKey="three">
                      <Analytics />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsTab;
