import { Menu, Container, Image, Icon } from "semantic-ui-react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header() {
  const router = useRouter();
  const user = true;

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
              src="logo.svg"
              style={{ marginRight: "1em" }}
            />
            TPK Design
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item active={isActive("/cart")}>
            <Icon name="cart" size="large" />
            Cart
          </Menu.Item>
        </Link>
        {user ? (
          <>
            <Link href="/cipta">
              <Menu.Item active={isActive("/cipta")}>
                <Icon name="add square" size="large" />
                Cipta
              </Menu.Item>
            </Link>
            <Link href="/account">
              <Menu.Item active={isActive("/account")}>
                <Icon name="user" size="large" />
                Account
              </Menu.Item>
            </Link>
            <Menu.Item>
              <Icon name="sign out" size="large" />
              Log Keluar
            </Menu.Item>
          </>
        ) : (
          <>
            <Link href="/login">
              <Menu.Item active={isActive("/login")}>
                <Icon name="sign in" size="large" />
                Log Masuk
              </Menu.Item>
            </Link>
            <Link href="/daftar">
              <Menu.Item active={isActive("/sign-up")}>
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
