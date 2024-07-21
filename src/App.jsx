import { useState, useRef} from 'react'

import {Button, Container, Row, Col} from 'react-bootstrap';

import {Form} from 'react-bootstrap';

import DataTable from './components/DataTable.jsx'; 

import productList from './accessory-product.json'

function App() {

  const pRef=useRef()
  const qRef=useRef()
  const [price,setPrice]=useState(productList[0].price)

  const [selectedItems,setSelectedItems]=useState([])

  const handleAdd=(e)=>{
    const pid=pRef.current.value
    const product=productList.find(p=>p.id==pid)
    const q=qRef.current.value 
    
    selectedItems.push({
      //id:product.id,
      //name:product.name,
      //price:product.price,
      ...product,
      qty:q})

      console.table(selectedItems)
      setSelectedItems([...selectedItems])
  }

  const handleProductChange=(e)=>{
    const pid= e.target.value
    const product= productList.find(p=>p.id==pid)
    const p = product.price
    console.log(p)
    setPrice(p)
  }

  return(
    <>
    <Container>
  <Row>
    <Col xs={2}>
    <span>Product</span>
    </Col>
    <Col>
    <Form.Select ref={pRef} onChange={handleProductChange}>
      {productList.map((p)=>(
        <option key={p.id} value={p.id}>{p.name}</option>
      ))
      }
      
    </Form.Select>
    </Col>
  </Row>


  <Row>
  <Col xs={2}>
    Price
    </Col>
    <Col>
    {price}
    </Col>
</Row>

  <Row>
  <Col xs={2}>
    <span>Quantity</span>
    </Col>
    <Col>
    <input type="number" ref={qRef}/>
    </Col>
</Row>

    <Button variant="primary" onClick={handleAdd}>Add</Button>
    <DataTable data={selectedItems}/>
    </Container>
    </>
  )
}
export default App
