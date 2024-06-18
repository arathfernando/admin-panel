import React from 'react';
import { Container } from 'reactstrap';
import EditProject from './EditProject';

const EditProduct = () => {
  return (
    <Container fluid className="product-launcher-container custom_styles">
      <Container
        className="flex-grow-1 px-2 px-md-3 px-lg-0"
        style={{ marginTop: 64 }}
      >
        <EditProject />
      </Container>
    </Container>
  );
};

export default EditProduct;
