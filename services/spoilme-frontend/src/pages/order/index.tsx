import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { FormattedMessage } from "react-intl";
import * as api from "../../api";
import { ScrollToTop } from "../../components/ScrollToTop";
import { OrderProducts } from "./OrderProducts";
import { OrderTotal } from "./OrderTotal";
import { PaymentMethodSelect } from "./PaymentMethodSelect";
import { ShippingAddress } from "./ShippingAddress";
import { Contacts } from "./Contacts";
import { Product } from "../../api";

interface OrderURLParams {
  username: string,
  productId: string,
};

const Container = styled.div`
  @media (min-width: 650px) {
    max-width: 720px;
    margin: 0 auto;
  }
`;

const OrderTitle = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin: 13px 0;
  text-align: center;
`;

const Separator = styled.div`
  margin: 0 auto;
  width: 90%;
  height: 3px;
  background-color: #FFEBF2;
`;

const OrderForm = styled.div`
  background-color: #DEE2FF;
  border-radius: 20px;
  margin: 15px;
  padding: 1px 0;
`;

function calcTotalFromProducts(products: Product[]|undefined):number|undefined {
  if(products === undefined || products.length === 0) {
    return undefined;
  } else {
    return products
      .map(product => product.price)
      .reduce((total, current) => total + current, 0);
  }
};

function Order() {
  const [pm, setPm] = useState("card");
  const [products, setProducts] = useState<Product[]|undefined>(undefined)
  const { username, productId } = useParams<OrderURLParams>();

  const total = calcTotalFromProducts(products);
  useEffect(() => {
    api.getProductInfo(parseInt(productId)).then((product) => setProducts([product]))
  }, [username, productId]);
  return (
    <Container>
      <ScrollToTop />
      <OrderTitle>
        <FormattedMessage
          id="checkout.your-order"
          defaultMessage="Your Order"
        />
      </OrderTitle>
      <Separator />
      <OrderProducts 
        products={products}
      />
      <Separator />
      <OrderTotal total={total}/>
      <Separator />
      <OrderForm>
        <PaymentMethodSelect 
          onChange={(pm) => setPm(pm)}
          value={pm}
        />
        <Separator />
        <ShippingAddress verifiedBy={username} />
        <Separator />
        <Contacts recipientUsername={username} />
      </OrderForm>
    </Container>
  );
}

export default Order;
