import React, { useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import { Icons } from "../assets";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCart, getAllCart, getMyPurchases } from "../store/snaker/snakerThunk";

export default function CartPage() {
  const dispatch = useDispatch();
  const { myPurchases } = useSelector((state) => state.snaker);
  console.log("cart: ", myPurchases);
  useEffect(() => {
    dispatch(getMyPurchases());
  }, [dispatch]);
  return (
    <div>
      <StyleGlobal />
      <h1 className="back">
        <Link to="/">
          <Icons.Group5 />
        </Link>
        <span style={{ paddingBottom: "7px" }}>Мои покупки</span>
      </h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {myPurchases.map((item) => (
          <div className="cart" key={item.id}>
            <div
              className="continerDivSvg"
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
              <div >
                <Icons.Group2 />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const StyleGlobal = createGlobalStyle`
  .back{
    margin: 2rem 0 3rem 5rem;
    display: flex;
    align-items: center;
    gap: 20px;
  }
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
  `;
