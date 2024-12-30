import React, { Fragment, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import MegaMenu from './MegaMenu'
import HomeSlider from './HomeSlider'
import axios from 'axios';
import AppURL from '../../api/AppURL';
import SliderLoading from '../PlaceHolder/SliderLoading';

function HomeTop() {
    const [MenuData, setMenuData] = useState([]);
    const [isLoading, setIsLoading] = useState("");
    const [mainDiv, setMainDiv] = useState("d-none");
    

    useEffect(()=>{
        axios.get(AppURL.AllCategoryDetails).then(response=>{
            setMenuData(response.data);
            setIsLoading("d-none");
            setMainDiv("")
        }).catch(error=>{

        })
    },[])
  return (
    <Fragment>
        <SliderLoading isLoading={isLoading} />
        <div className={mainDiv}>
        <Container className='p-0 m-0 overflow-hidden' fluid={true}>
            <Row>
                <Col lg={3} md={3} sm={12}>
                    <MegaMenu data={MenuData} />
                </Col>
                <Col lg={9} md={9} sm={12}>
                    <HomeSlider />
                </Col>
            </Row>
        </Container>
        </div>
    </Fragment>
  )
}

export default HomeTop