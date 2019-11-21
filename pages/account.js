import axios from "axios";
import { parseCookies } from "nookies";

import baseUrl from "../utils/baseUrl";

import AccountTop from "../components/account/Top";
import OrdersListing from "../components/account/OrdersListing";
import Permissions from "../components/account/Permissions.js";

function AccountP({ user, orders }) {
  return (
    <>
      <AccountTop {...user} />
      <OrdersListing orders={orders} />
      {user.role === "admin" && <Permissions />}
    </>
  );
}

AccountP.getInitialProps = async ctx => {
  const { token } = parseCookies(ctx);

  if (!token) {
    return { orders: [] };
  }

  const payload = { headers: { Authorization: token } };
  const url = `${baseUrl}/api/orders`;
  const res = await axios.get(url, payload);
  return res.data;
};

export default AccountP;
