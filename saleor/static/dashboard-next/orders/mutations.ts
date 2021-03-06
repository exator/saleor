import gql from "graphql-tag";

import { TypedMutation } from "../mutations";
import {
  fragmentAddress,
  fragmentOrderDetails,
  fragmentOrderEvent
} from "./queries";
import { OrderAddNote, OrderAddNoteVariables } from "./types/OrderAddNote";
import { OrderCancel, OrderCancelVariables } from "./types/OrderCancel";
import { OrderCapture, OrderCaptureVariables } from "./types/OrderCapture";
import {
  OrderCreateFulfillment,
  OrderCreateFulfillmentVariables
} from "./types/OrderCreateFulfillment";
import { OrderRefund, OrderRefundVariables } from "./types/OrderRefund";
import { OrderRelease, OrderReleaseVariables } from "./types/OrderRelease";
import { OrderUpdate, OrderUpdateVariables } from "./types/OrderUpdate";

const orderCancelMutation = gql`
  ${fragmentOrderDetails}
  mutation OrderCancel($id: ID!) {
    orderCancel(id: $id, restock: true) {
      order {
        ...OrderDetailsFragment
      }
    }
  }
`;
export const TypedOrderCancelMutation = TypedMutation<
  OrderCancel,
  OrderCancelVariables
>(orderCancelMutation);

const orderRefundMutation = gql`
  ${fragmentOrderDetails}
  mutation OrderRefund($id: ID!, $amount: Decimal!) {
    orderRefund(id: $id, amount: $amount) {
      errors {
        field
        message
      }
      order {
        ...OrderDetailsFragment
      }
    }
  }
`;
export const TypedOrderRefundMutation = TypedMutation<
  OrderRefund,
  OrderRefundVariables
>(orderRefundMutation);

const orderReleaseMutation = gql`
  ${fragmentOrderDetails}
  mutation OrderRelease($id: ID!) {
    orderRelease(id: $id) {
      order {
        ...OrderDetailsFragment
      }
    }
  }
`;
export const TypedOrderReleaseMutation = TypedMutation<
  OrderRelease,
  OrderReleaseVariables
>(orderReleaseMutation);

const orderCaptureMutation = gql`
  ${fragmentOrderDetails}
  mutation OrderCapture($id: ID!, $amount: Decimal!) {
    orderCapture(id: $id, amount: $amount) {
      errors {
        field
        message
      }
      order {
        ...OrderDetailsFragment
      }
    }
  }
`;
export const TypedOrderCaptureMutation = TypedMutation<
  OrderCapture,
  OrderCaptureVariables
>(orderCaptureMutation);

const orderCreateFulfillmentMutation = gql`
  mutation OrderCreateFulfillment($input: FulfillmentCreateInput!) {
    fulfillmentCreate(input: $input) {
      errors {
        field
        message
      }
    }
  }
`;
export const TypedOrderCreateFulfillmentMutation = TypedMutation<
  OrderCreateFulfillment,
  OrderCreateFulfillmentVariables
>(orderCreateFulfillmentMutation);

const orderAddNoteMutation = gql`
  ${fragmentOrderEvent}
  mutation OrderAddNote($order: ID!, $input: OrderAddNoteInput!) {
    orderAddNote(order: $order, input: $input) {
      errors {
        field
        message
      }
      order {
        id
        events {
          ...OrderEventFragment
        }
      }
    }
  }
`;

const orderUpdateMutation = gql`
  ${fragmentAddress}
  mutation OrderUpdate($id: ID!, $input: OrderUpdateInput!) {
    orderUpdate(id: $id, input: $input) {
      errors {
        field
        message
      }
      order {
        id
        userEmail
        billingAddress {
          ...AddressFragment
        }
        shippingAddress {
          ...AddressFragment
        }
      }
    }
  }
`;
export const TypedOrderAddNoteMutation = TypedMutation<
  OrderAddNote,
  OrderAddNoteVariables
>(orderAddNoteMutation);
export const TypedOrderUpdateMutation = TypedMutation<
  OrderUpdate,
  OrderUpdateVariables
>(orderUpdateMutation);
