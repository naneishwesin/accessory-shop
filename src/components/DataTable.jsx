import React from 'react';
import { Table } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

const DataTable = ({ data, onDelete }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>Action</th>
          <th>ID</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Qty</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>
              <BsTrash 
                style={{ cursor: 'pointer' }}
                onClick={() => onDelete(index)} 
              />
            </td>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.qty}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DataTable;
