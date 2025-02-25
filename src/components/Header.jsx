import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Icons } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllCart,
  deleteCart,
  getAllCart,
  getAllFavorite,
  getMyPurchases,
  postMyPurchases,
} from "../store/snaker/snakerThunk";
import { Link } from "react-router-dom";
import Modal from "./UI/Modal";
import { TbTruckDelivery } from "react-icons/tb";
import { IoCardOutline } from "react-icons/io5";
import { LogInIcon } from "lucide-react";
import { deleteProfileImage } from "../store/snaker/snakerSlice";

export default function Header() {
  const { favorite, cart, myPurchases, profileImage } = useSelector(
    (state) => state.snaker
  );
  const [isOpenModalCart, setIsOpenModalCart] = useState(false);
  const [isProfilModal, setIsProfilModal] = useState(false);
  const [isCartModal, setIsCartModal] = useState(false);
  const [preview, setPreview] = useState(profileImage);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCart());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllFavorite());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getMyPurchases());
  }, []);
  useEffect(() => {
    dispatch(getAllCart());
  }, []);

  const handleIsOpenModalCart = () => {
    setIsOpenModalCart(!isOpenModalCart);
    setIsCartModal(true);
  };
  const handleIsProfilModal = () => {
    setIsProfilModal(!isProfilModal);
  };
  const handlerDeleteCart = (id) => {
    dispatch(deleteCart(id));
  };
  const handlerDeleteAllCart = () => {
    dispatch(deleteAllCart());
    dispatch(postMyPurchases(...cart));
    setIsCartModal(false);
  };
  const handleDelete = () => {
    dispatch(deleteProfileImage());
    setPreview(null);
  };

  let total = cart.reduce((sum, item) => {
    let cleanedPrice = parseInt(item.price.replace(/\s/g, ""));
    return sum + (isNaN(cleanedPrice) ? 0 : cleanedPrice);
  }, 0);

  let frmattedTotal = new Intl.NumberFormat("ru-Ru").format(total);

  return (
    <>
      <header>
        <StyleGlobal />
        <div id="a-left-header">
          <div id="left-header">
            <Link to="/">
              <img src="src/assets/image/image 4.png" alt="Иконка" />
            </Link>
            <div id="text-left-header">
              <h1>JAVA-SCRIPT SNEAKERS</h1>
              <p>Магазин лучших кроссовок</p>
            </div>
          </div>
        </div>
        <div id="right-header">
          <div id="one-div" onClick={handleIsOpenModalCart}>
            {cart.length < 0 && null}
            {cart.length > 0 && (
              <span className="length-cart">{cart.length}</span>
            )}
            <span>
              <Icons.Group />
            </span>
            {total === 0 ? <p>не товаров</p> : <p>{frmattedTotal} руб</p>}
          </div>
          <Link to="favorite" id="two-div">
            {favorite.length < 0 && null}
            {favorite.length > 0 && (
              <span className="length-favorite">{favorite.length}</span>
            )}
            <span>
              <Icons.Viver />
            </span>
            <p>Избранныое</p>
          </Link>
          <div id="three-div" onClick={handleIsProfilModal}>
            <Icons.Union />
            <p>Профиль</p>
            {isProfilModal && (
              <div>
                <div className="bakDrop" onClick={handleIsProfilModal}></div>
                <Modal className="modalProfile">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                      marginBottom: "30px",
                    }}
                  >
                    <Link to={"profile"} className="profilModal">
                      {preview ? (
                        <span className="profileIconModal">
                          <img
                            src={preview}
                            alt="Profile Preview"
                            className="profileIconModal"
                          />
                        </span>
                      ) : (
                        <span className="profileIconModal">
                          <Icons.Union />
                        </span>
                      )}

                      <div>
                        <p>example</p>
                        <p>example@example.com</p>
                      </div>
                    </Link>
                    <Link to="favorite" className="alin-item-center">
                      {favorite.length < 0 && null}
                      {favorite.length > 0 && (
                        <span className="length-favorite">
                          {favorite.length}
                        </span>
                      )}
                      <Icons.Viver />
                      <span> Избранныое</span>
                    </Link>
                    <Link to="cartPage" className="alin-item-center">
                      {myPurchases.length < 0 && null}
                      {myPurchases.length > 0 && (
                        <span className="length-cart">
                          {myPurchases.length}
                        </span>
                      )}
                      <Icons.Group />
                      <span>Покупки</span>
                    </Link>
                    <p className="alin-item-center">
                      <TbTruckDelivery
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          color: "rgb(157, 157, 157)",
                        }}
                      />
                      <span>Доставки</span>
                    </p>
                    <p className="alin-item-center">
                      <IoCardOutline
                        style={{
                          width: "1.5rem",
                          height: "1.5rem",
                          color: "rgb(157, 157, 157)",
                        }}
                      />
                      <span> Способы оплаты</span>
                    </p>
                  </div>
                  <hr />
                  <Link className="logOut" to="/">
                    <LogInIcon style={{ color: "rgb(157, 157, 157)" }} /> выйти
                  </Link>
                </Modal>
              </div>
            )}
          </div>
        </div>
      </header>
      {isOpenModalCart && (
        <div>
          <div className="bakDrop" onClick={handleIsOpenModalCart}></div>
          <Modal className="modall">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h2 className="modalH2">корзина</h2>
              <span
                style={{ marginRight: "20px", marginTop: "20px" }}
                onClick={handleIsOpenModalCart}
              >
                <Icons.Group5 />
              </span>
            </div>
            {cart.length === 0 ? (
              <div>
                {isCartModal ? (
                  <div>
                    <div className="modalLength">
                      <img src="src/assets/image/Group 117.png" alt="" />
                      <h3 style={{ marginTop: "30 px" }}>Корзина пустая</h3>
                      <p
                        style={{
                          width: "285px",
                          marginBottom: "50px",
                          marginTop: "20px",
                        }}
                      >
                        Добавьте хотя бы одну пару кроссовок, чтобы сделать
                        заказ.
                      </p>
                      <button className="order" onClick={handleIsOpenModalCart}>
                        <Icons.Group7 /> <span>Вернуться назад</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="modalLength">
                      <img src="src/assets/image/Group 117 2.png" alt="" />
                      <h3 style={{ color: "#87C20A", marginTop: "30px" }}>
                        Заказ оформлен!
                      </h3>
                      <p
                        style={{
                          width: "285px",
                          marginBottom: "50px",
                          marginTop: "20px",
                          fontWeight: "400",
                          color: "#0000009b",
                        }}
                      >
                        Ваш заказ #18 скоро будет передан курьерской доставке
                      </p>
                      <button className="order" onClick={handleIsOpenModalCart}>
                        <Icons.Group7 /> <span>Вернуться назад</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "20px",
                    overflowY: "scroll",
                    height: "67vh",
                  }}
                >
                  {cart.map((item) => (
                    <div key={item.id} className="modalCart">
                      <img className="modalImage" src={item.img} alt="" />
                      <div
                        style={{
                          width: "150px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <p className="modalTitle">{item.title}</p>
                        <p className="modalPrice">{item.price}</p>
                      </div>
                      <span
                        className="modalIcon"
                        onClick={() => handlerDeleteCart(item.id)}
                      >
                        <Icons.Group6 />
                      </span>
                    </div>
                  ))}
                </div>
                <div className="total">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>итого:</p>
                    <p>{frmattedTotal} руб</p>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Налог 5%:</p>
                    <p>1074 руб</p>
                  </div>
                  <button className="order" onClick={handlerDeleteAllCart}>
                    Оформить заказ
                  </button>
                </div>
              </div>
            )}
          </Modal>
        </div>
      )}
      <hr />
    </>
  );
}
const StyleGlobal = createGlobalStyle`
.bakDrop{
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #00000067;
  top: 0;
  left: 0;
  z-index: 1;
}
.logOut{
  color: #000000;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-top: 30px;
  gap: 10px;
}
.alin-item-center{
display: flex;
align-items: center;
gap: 10px;
text-decoration: none;
color: #000000;
position: relative;
}
.profileIconModal{
 background-color: #f1f1f5;
 width: 40px;
 height: 40px;
 border-radius: 50%;
 display: flex;
 justify-content: center;
 align-items: center;
}
.profilModal{
  display: flex;
  align-items: center;
  gap: 15px;
  text-decoration: none;
  color: black;
}
.modalProfile{
  width: 300px;
  height: 400px;
  position: absolute;
  top: 9rem;
  right: 14rem;
  z-index:2;
  background-color: #ffff ;
    border-radius: 12px;
  box-shadow: 0px 0px 11px 1px rgba(34, 60, 80, 0.22);
  padding: 20px;
}
.modalLength{
 height: 100vh;
 display: flex;
 justify-content:center ;
 align-items: center;
 flex-direction: column;
 
}
.order{
  width: 325px;
  height:55px;
  color: #FFFFFF;
  border-radius: 18px;
  background-color: #9DD458;
  border:  none;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
}
.total{
  padding: 0 30px 0 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: fixed;
  bottom: 0;
}
.modalIcon{
position: relative;
top: 28px;
}
.modall{
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #FFFFFF;
   width: 400px;
   height: 100%;
   position: fixed;
   z-index: 2;
   top: 0px;
   right: 0px;
   transition: 0.3s ease-out;
  
}
.modalCart{
  border-radius: 20px;
  border: 2px solid #F3F3F3;
  width: 325px;
  height: 119px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin-top: 20px;
}
.modalPrice{
  font-size: 14px;
  font-weight: 700;
}
.modalTitle{
  font-size: 14px;
  font-weight: 400;
  width: 160px;
  height: 34px;
}
.modalImage{
  width: 70px;
  height: 70px;
}
.modalH2{
  margin-top: 10px;
  margin-left: 20px;
}
.length-favorite{
  position: absolute;
  left: 10px;
  bottom: 8px;
  z-index: 1;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
}
.length-cart{
  position: absolute;
  left: 13px;
  bottom: 10px;
  z-index: 1;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  width: 15px;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1px;
}
    header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 43px 60px;
    margin: 0px auto;
    width: 100%;
    height: 41px;
}
#a-left-header {
  text-decoration: none;
  #left-header {
    display: flex;
    gap: 16px;
    img {
      width: 40px;
      height: 40px;
    }
    #text-left-header {
      h1 {
        height: 24px;
        font-size: 20px;
        color: black;
      }
      p {
        width: 189px;
        height: 17px;
        font-size: 14px;
        color: rgb(157, 157, 157);
      }
    }
  }
}
#right-header {
  display: flex;
  gap: 32px;
  align-items: center;
  #one-div {
    display: flex;
    gap: 10px;
    position: relative;
    p {
      color: rgb(157, 157, 157);
    }
  }
  #two-div {
    display: flex;
    gap: 10px;
    align-items: center;
    position: relative;
    text-decoration: none;
    p {
      color: rgb(157, 157, 157);
    }
  }
  #three-div {
    display: flex;
    gap: 10px;
    position: relative;
    p {
      color: rgb(157, 157, 157);
    } 
  }
}
hr{
  background-color:#EAEAEA;
}
`;
