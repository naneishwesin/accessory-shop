import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import DataTable from './components/DataTable.jsx'; 
import productList from './accessory-product.json';

function App() {
  const pRef = useRef();
  const qRef = useRef();
  const searchRef = useRef();
  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  const handleAdd = () => {
    const pid = pRef.current.value;
    const product = productList.find(p => p.id == pid);
    const q = qRef.current.value;

    const newSelectedItem = {
      ...product,
      qty: q
    };

    setSelectedItems([...selectedItems, newSelectedItem]);
  };

  const handleProductChange = (e) => {
    const pid = e.target.value;
    const product = productList.find(p => p.id == pid);
    setPrice(product.price);
  };

  const handleDelete = (index) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems.splice(index, 1);
    setSelectedItems(newSelectedItems);
  };

  const handleSearch = () => {
    setSearchQuery(searchRef.current.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredItems = selectedItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={2}>
          <span>Product</span>
        </Col>
        <Col>
          <Form.Select ref={pRef} onChange={handleProductChange}>
            {productList.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col xs={2}>Price</Col>
        <Col>{price}</Col>
      </Row>

      <Row className="mb-3">
        <Col xs={2}>
          <span>Quantity</span>
        </Col>
        <Col>
          <input type="number" ref={qRef} defaultValue={1} />
        </Col>
      </Row>

      <Button variant="primary" onClick={handleAdd}>Submit</Button>

      <Row className="mt-3 mb-3">
        <Col xs={5}>
          <input
            type="text"
            placeholder="Search..."
            ref={searchRef}
            className="form-control"
          />
        </Col>
        <Col xs={1}>
          <Button variant="primary" onClick={handleSearch}>
            <FaSearch />
          </Button>
        </Col>
        <Col xs={2}>
          <Button variant="secondary" onClick={() => handleSort('name')}>
            Sort by Name
          </Button>
        </Col>
      </Row>

      <DataTable data={sortedItems} onDelete={handleDelete} />
    </Container>
  );
}

export default App;
