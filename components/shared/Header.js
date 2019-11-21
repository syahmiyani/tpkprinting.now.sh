import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

import { handleLogout } from "../../utils/auth";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === "root";
  const isAdmin = user && user.role === "admin";
  const isRootOrAdmin = isRoot || isAdmin;

  function isActive(route) {
    return route === router.pathname;
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href="/">
          <Menu.Item header active={isActive("/")}>
            <Image
              size="mini"
              src="https://res.cloudinary.com/dz8mnabzz/image/upload/v1573537512/next-store-reed/logo.svg"
              style={{ marginRight: "1em" }}
            />
            TPK Design
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item active={isActive("/cart")}>
            <Icon name="cart" size="large" />
            Kart
          </Menu.Item>
        </Link>
        {isRootOrAdmin && (
          <Link href="/create">
            <Menu.Item active={isActive("/create")}>
              <Icon name="add square" size="large" />
              Cipta
            </Menu.Item>
          </Link>
        )}
        {user ? (
          <>
            <Link href="/account">
              <Menu.Item active={isActive("/account")}>
                <Icon name="user" size="large" />
                Akaun
              </Menu.Item>
            </Link>
            <Menu.Item onClick={handleLogout}>
              <Icon name="sign out" size="large" />
              Log Keluar
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/signin">
              <Menu.Item active={isActive("/signin")}>
                <Icon name="sign in" size="large" />
                Log Masuk
              </Menu.Item>
            </Link>
            <Link href="/signup">
              <Menu.Item active={isActive("/signup")}>
                <Icon name="signup" size="large" />
                Daftar
              </Menu.Item>
            </Link>
          </>
        )}
      </Container>
    </Menu>
  );
}

export default Header;
