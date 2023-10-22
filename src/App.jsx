import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import CartContainer from "./components/cart/CartContainer"
import NavBar from "./components/navBar/NavBar"
import { Routes, Route } from 'react-router-dom';
import ItemListContainer from "./components/item/ItemListContainer";
import Home from "./components/home/Home";
import { ItemDetail } from "./components/item/ItemDetail";
import { CartContextProvider } from "./components/cart/CartContextProvider";
import { CartDetail } from "./components/cart/CartDetail";
import { Orders } from "./components/orders/Orders";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Footer } from "./components/Footer/Footer";

function App() {

  return (
    <div className="page-container">
      <div className="content-wrap">
        <CartContextProvider>
          <Container fluid>
            <Row className="content-wrap">
              <Col>
                <Row>
                  <Col>
                    <h1 style={{ textAlign: "center" }}>
                      <i className="bi bi-shop text-info"></i>Tienda Deportiva Club de Fútbol Cruz Azul
                    </h1>
                  </Col>
                  <Col>
                    <CartContainer></CartContainer>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <NavBar></NavBar>
                  </Col>
                </Row>
                <Row>
                  <Col>

                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Routes>
            <Route path="*" element={<Home greeting="Bienvenido a nuestra tienda en línea" />} />
            <Route path="productos/:categoryId" element={<ItemListContainer />} />
            <Route path="item/:productId" element={<ItemDetail />} />
            <Route path="cart" element={<CartDetail />} />
            <Route path="orders" element={<Orders />} />
          </Routes>
        </CartContextProvider>
      </div>
      <Footer />
    </div>
  )
}

export default App
