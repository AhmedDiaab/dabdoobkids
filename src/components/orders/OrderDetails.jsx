import { useParams } from "react-router-dom";
import styles from "../../styles/pages/Profile.module.css";
import { useEffect, useState } from "react";
import { getSingleOrder } from "../../utils/apiCalls";
import OrderCard from "../OrderCard";

export default function OrderDetails() {

    const [order , setOrder] = useState(null);
    const {id} = useParams();
    useEffect(() => {
            getSingleOrder(id).then((res) => {
                console.log(res?.data , "res.orderDetailsaldasdad");
            })
    },[])


  return (

        <>
   
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
                  backgroundColor: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                }}
              >
                <div className={styles.row_wrap}>
                  <img
                    src="./back.png"
                    style={{ height: "20px", cursor: "pointer" }}
                    onClick={() => {
                    
                    }}
                  />
                  <div>Order ID: {order?.id}</div>
                  <img
                    src="./close.svg"
                    style={{
                      height: "20px",
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
                    onClick={() => {
                      
                    }}
                  />
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Status</div>
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "6px 8px 6px 8px",
                      backgroundColor: "#F4F5F6", // In Delivery
                      color: "#000",
                      // backgroundColor: "#FFF7E5", // Waiting Payment
                      // color: "#FFAB00",
                      // backgroundColor: "#FFF2F0", // Waiting Payment
                      // color: "#FF5630",
                    }}
                  >
                    In Delivery
                  </div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>
                    Purchase date
                  </div>
                  <div
                    style={{
                      color: "#000",
                    }}
                  >
                    Sunday, 9th of October 2022, 10:12 AM
                  </div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Invoice</div>
                  <div
                    style={{
                      color: "var(--brown)",
                    }}
                  >
                    INV/20221114/MPL/28203158839
                  </div>
                </div>
                <div className={styles.main_title}>
                  Product Detail
                </div>
                {order?.items.map((item) => (
                  <>
                    <OrderCard />
                    <div
                      style={{
                        width: "100%",
                        borderBottom: "1px solid #EDEDED",
                        marginTop: "5px",
                        marginBottom: "5px",
                      }}
                    />
                  </>
                ))}
                <div className={styles.main_title}>
                  Payment Details
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>
                    Total Shoping
                  </div>
                  <div>$ 1.500.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Shipping</div>
                  <div>$ 10.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div className={styles.left_title}>Tax</div>
                  <div>$ 10.00</div>
                </div>
                <div className={styles.row_wrap}>
                  <div
                    className={styles.left_title}
                    style={{ color: "var(--brown)" }}
                  >
                    Discount
                  </div>
                  <div style={{ color: "var(--brown)" }}>
                    -$ 50.00
                  </div>
                </div>
                <div
                  className={styles.row_wrap}
                  style={{ fontWeight: "bold" }}
                >
                  <div
                    className={styles.left_title}
                    style={{ fontWeight: "bold", color: "#000" }}
                  >
                    Subtotal
                  </div>
                  <div>$ 1.570.00</div>
                </div>
                <button
                  style={{
                    width: "100%",
                    height: "48px",
                    padding: "13px",
                    borderRadius: "10px",
                    border: "2px",
                    gap: "12px",
                    color: "#F04438",
                    border: "2px solid #F04438",
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Refund
                </button>
              </div>
            
        </>
      )
}
