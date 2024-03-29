import styled from "@emotion/styled";
import { FormattedMessage } from "react-intl";
import Visa from "../../assets/images/visa.png";
import MC from "../../assets/images/mc.png";
import PayPal from "../../assets/images/paypal.png";


interface PaymentMethodSelectProps {
  value: string,
  onChange: (value: string) => void,
};

interface PaymentMethodProps {
  active: boolean,
  onClick: (name: string) => void,
};

interface RadioIconProps {
  checked: boolean,
};

const PaymentMethodsContainer = styled.div`
  margin: 15px 15px;
`;

const PaymentMethodsTitle = styled.h3`
  font-weight: 500;
  font-size: 18px;
`;

const PaymentMethodCardContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 24px 85px 85px 85px;
`;

const PaymentMethodPayPalContainer = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 24px 85px;
  grid-template-rows: 50px;
`;

const RadioIconContainer = styled.div`
  position: relative;
  align-self: center;
  width: 15px;
  height: 15px;
  border: 1px solid #000;
  border-radius: 50%;

  > .filler {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 11px;
    height: 11px;
    background-color: #83B692;
    border-radius: 50%;
  }
`;

const CardIcon = styled.img`
  width: 75px;
  align-self: center;
`;

const RadioIcon = (props: RadioIconProps) => {
  const { checked } = props;
  return (
    <RadioIconContainer>
      {checked &&
        <div className="filler" />
      }
    </RadioIconContainer>
  )
};

const PaymentMethodCard = (props: PaymentMethodProps) => {
  const { active, onClick } = props;
  return (
    <PaymentMethodCardContainer onClick={() => onClick("card")}>
      <RadioIcon checked={active} />
      <CardIcon src={Visa} />
      <CardIcon src={MC} />
    </PaymentMethodCardContainer>
  )
}

const PaymentMethodPayPal = (props: PaymentMethodProps) => {
  const { active, onClick } = props;
  return (
    <PaymentMethodPayPalContainer onClick={() => onClick("paypal")}>
      <RadioIcon checked={active} />
      <CardIcon src={PayPal} />
    </PaymentMethodPayPalContainer>
  )
}

const PaymentMethodSelect = (props: PaymentMethodSelectProps) => {
  const { value, onChange } = props;
  return (
    <PaymentMethodsContainer>
      <PaymentMethodsTitle>
        <FormattedMessage
          id="checkout.payment-method"
          defaultMessage="Payment Method"
        />
      </PaymentMethodsTitle>
      { false && <PaymentMethodCard 
        active={value === "card"}
        onClick={onChange}
      /> }
      <PaymentMethodPayPal
        active={value === "paypal"}
        onClick={onChange}
      />
    </PaymentMethodsContainer>
  );
};

export {
  PaymentMethodSelect,
};