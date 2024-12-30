import React, { Fragment } from "react";
import { Breadcrumb, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


function Refund() {
  return (
    <Fragment>
      <Container>
      <div className="breadbody">
    <Breadcrumb>
      <Breadcrumb.Item> <Link to="/" >Home</Link> </Breadcrumb.Item>
      <Breadcrumb.Item >
          <Link to="/refund">Refund</Link>
      </Breadcrumb.Item>
    </Breadcrumb>
    </div>
        <Row className="p-2">
          <Col
            className="shadow-sm bg-white mt-2"
            md={12}
            lg={12}
            sm={12}
            xs={12}
          >
            <h4 className="section-title-login">Refund Page</h4>
            <p className="section-title-contact">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi
              accusamus, obcaecati atque suscipit eaque rerum consectetur
              sapiente. Modi facilis quisquam ad deserunt accusamus! Cumque quod <br /><br />
              nulla, dolores praesentium ipsa ratione perferendis tempore dicta
              rem libero harum voluptas suscipit nam quas minus maxime eaque
              nihil temporibus? Dolores et esse ab animi reprehenderit magni,
              eveniet nobis architecto beatae! Dolorem harum odit libero<br /><br />
              voluptas. Hic eius, inventore laboriosam molestiae accusantium
              provident aut excepturi expedita fugit similique officiis deleniti
              esse ut, nisi quos perspiciatis laborum ipsum odit aliquam totam.
              Est temporibus natus illo earum quaerat odio facere. Iusto autem<br /><br />
              tempore consequatur possimus sapiente ducimus, tenetur architecto
              inventore ratione sint cum corrupti rem. Repudiandae adipisci
              quisquam doloribus reprehenderit mollitia nesciunt pariatur,
              accusantium nobis quidem, eveniet quo laborum ad magnam architecto
              qui omnis voluptatum dignissimos sint recusandae, laboriosam sed<br /><br />
              repellat! Est cupiditate veritatis omnis repellendus sequi et iste
              magnam! Voluptatem deserunt accusamus sint, maxime aut nemo vitae?
              Mollitia eveniet id exercitationem quos laudantium beatae ullam
              distinctio sit? Eaque repellendus earum qui maxime harum eius
              aliquam laboriosam quas perferendis nihil. Hic eligendi adipisci<br /><br />
              dolore voluptate fugiat quod aut esse pariatur nulla fugit? Magni,
              beatae hic rem corrupti ratione harum ipsum, aliquid pariatur
              laudantium, accusamus natus saepe adipisci?
            </p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default Refund