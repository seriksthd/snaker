import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import {
  getAllSnaker,
  postCart,
  postFavorite,
} from "../store/snaker/snakerThunk";
import { Icons } from "../assets";

export default function Main() {
  const dispatch = useDispatch();
  const { snaker, favorite } = useSelector((state) => state.snaker);
  console.log("snaker: ", snaker);

  useEffect(() => {
    dispatch(getAllSnaker());
  }, [dispatch]);

  const handleAddFavorite = (product) => {
    const alreadyInCart = favorite.some((item) => item.id === product.id);
    if (!alreadyInCart) {
      dispatch(postFavorite(product));
    } else {
      alert("Бул буюм корзинада бар!");
    }
  };
  const handleAddCart = (product) => {
    dispatch(postCart(product));
  };
  return (
    <div style={{ padding: "60px" }}>
      <StyleGlogal />
      <section id="info-center">
        <div id="left-main">
          <img
            src="src/assets/image/adidas and disnei.png"
            alt="collaboration"
          />
          <h1>
            <span style={{ color: "rgb(139, 180, 60)" }}>Stan Smith</span>,
            <br />
            Forever!
          </h1>
          <button>Купить</button>
        </div>
        <div id="right-main">
          <img
            src="src/assets/image/image 6.png"
            alt="Kermit and SNEAKERS Adidas"
          />
        </div>
      </section>
      <div id="sneakers">
        <h1>Все кроссовки</h1>
        <div id="con">
          <div className="iconGroup4">
            <Icons.Group4 />
          </div>
          <input type="text" placeholder="Поиск..." />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {snaker.map((item) => (
          <div className="cart" key={item.id}>
            <div
              className="continerDivSvg"
              onClick={() => handleAddFavorite(item)}
            >
              <Icons.Vector1 />
            </div>
            <img className="cartImage" src={item.img} alt={item.title} />
            <h1 className="cartName">{item.title}</h1>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "100%" }}>
                <p>ценв:</p>
                <p className="price">
                  <span>{item.price}</span>
                  <span> руб</span>
                </p>
              </div>
              <div onClick={() => handleAddCart(item)}>
                <Icons.Group2 />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const StyleGlogal = createGlobalStyle`
.cart {
  width: 210px;
  height: 260px;
  box-sizing: border-box;
  border: 1px solid rgb(243, 243, 243);
  border-radius: 40px;
  background: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  transition: 0.3s ease-out;
  padding: 20px 30px 20px 30px;
  position: relative;
  .price {
    height: 17px;
    font-size: 14px;
    font-weight: 700;

  }
  
}

.cartImage{
        width: 133px;
        height: 112px;
}
.cartName{
    font-size: 14px;
}


.continerDivSvg{
  
    position: absolute;
    top: 35px;
    left: 35px;
}


  #info-center {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 300px;
  border-radius: 20px;
  background: rgb(244, 239, 233);
  flex-wrap: wrap;
  #left-main {
    img {
      margin: 16px 20px;
      width: 140px;
      height: 40px;
    }
    h1 {
      width: 100%;
      margin: 0px 61px;
      font-size: 38px;
      font-weight: 700;
    }
    button {
      margin: 14px 61px;
      color: white;
      width: 177.46px;
      height: 47.09px;
      border: none;
      font-size: 16px;
      font-weight: 700;
      border-radius: 110px;
      background: rgb(165, 211, 100);
    }
  }
  #right-main {
    height: 300px;
    margin-left: 60px;
  }
  #img-vector {
    position: relative;
    right: 25px;
  }
}
#sneakers {
  display: flex;
  padding: 39px 0px;
  width: 100%;
  justify-content: space-between;
  h1 {
    font-size: 32px;
    font-weight: 700;
  }
  input {
    width: 250px;
    height: 45px;
    box-sizing: border-box;
    border: 1px solid rgb(243, 243, 243);
    border-radius: 10px;
    padding-left: 40px;
  }
  #con {
    display: flex;
    align-items: center;
    .iconGroup4 {
      position: relative;
      left: 30px;
      top: 2.5px;
    }
  }
}
`;
