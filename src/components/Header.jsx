import React, { useEffect, useState } from "react";
import { createGlobalStyle } from "styled-components";
import { Icons } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getAllFavorite } from "../store/snaker/snakerThunk";
import { Link } from "react-router-dom";
import Modal from "./UI/Modal";

export default function Header() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { favorite } = useSelector((state) => state.snaker);
  console.log("cart: ", favorite);
  useEffect(() => {
    dispatch(getAllFavorite());
  }, []);
  const handleIsOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  };
  let total = favorite.reduce((sum, item) => {
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
          <div id="one-div">
            <Link to="cartPage">
              <Icons.Group />
            </Link>
          </div>
          <div id="two-div">
            {favorite.length < 0 && null}
            {favorite.length > 0 && <span className="length">{favorite.length}</span>}
            <span onClick={handleIsOpenModal}>
              <Icons.Viver />
            </span>
            <p>Закладки</p>
          </div>
          <div id="three-div">
            <Icons.Union />
            <p>Профиль</p>
          </div>
        </div>
      </header>
      {isOpenModal && (
        <Modal className="modal" handleIsOpenModal={handleIsOpenModal}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2 className="modalH2">корзина </h2>
            <span
              style={{ marginRight: "20px", marginTop: "20px" }}
              onClick={handleIsOpenModal}
            >
              <Icons.Group5 />
            </span>
          </div>
          {favorite.length === 0 ? (
            <div className="modalLength">
              <img src="src/assets/image/Group 117.png" alt="" />
              <p>Корзина пустая</p>
              <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
              <button>Вернуться назад</button>
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
                  height:"67vh"
                }}
              >
                {favorite.map((item) => (
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
                    <span className="modalIcon">
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
                <button className="order">Оформить заказ</button>
              </div>
            </div>
          )}
        </Modal>
      )}
      <hr />
    </>
  );
}
const StyleGlobal = createGlobalStyle`
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
.modal{
  display: flex;
flex-direction: column;
  gap: 20px;
  
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
.length{
  position: absolute;
  left: 10px;
  bottom: 8px;
  z-index: 1;
  background-color: red;
  color: white;
  border-radius: 50%;
  font-size: 10px;
  padding: 2px;
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
    img {
      width: 18px;
      height: 18px;
    }
  }
  #two-div {
    display: flex;
    gap: 8px;
    align-items: center;
    position: relative;
    img {
      width: 18px;
      height: 18px;
    }
    p {
      color: rgb(157, 157, 157);
    }
  }
  #three-div {
    display: flex;
    gap: 8px;
    img {
      width: 18px;
      height: 18px;
    }
    p {
      color: rgb(157, 157, 157);
    }
  }
}
hr{
  background-color:#EAEAEA;
}
`;
