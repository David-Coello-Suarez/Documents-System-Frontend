import { Col, Row } from "react-bootstrap"
import { AddButton } from "../../../components/iu"
import RolList from "./RolList"

const Layout = () => {
  return (
    <>
      <AddButton titleWindows="Perfiles y permisos" />

      <Row>
        <Col sm={4} md={4} lg={4} xl={3}>
          <RolList />
        </Col>
        <Col sm={8} md={8} lg={8} xl={9}></Col>
      </Row>
    </>
  )
}

export default Layout
