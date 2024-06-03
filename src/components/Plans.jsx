import React, { useEffect, useState } from "react";
import styles from "../styles/components/Plans.module.css";
import premium from "../images/premium.png";
import { ArrowRight2 } from "iconsax-react";
import check from "../images/check.svg";
import { getPlans, getUserPlan, subscribeToPlan } from "../utils/apiCalls";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { toast } from "react-toastify";
export default function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = React.useState([]);
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [paymentLink, setPaymentMethod] = useState("");

  useEffect(() => {
    getPlans().then((res) => {
      setPlans(res);
    });
  }, []);
  // console.log(plans?.items[1]?.extraInfo, "plans");
  //   Object.keys(plans?.items?.extraInfo).map((key,value) => {
  //     console.log(key,"key123231123")

  // })

  useEffect(() => {
    getUserPlan().then((res) => {
      console.log(res, "userplanssssssssssssssssssssss");
    });
  }, []);
  console.log(plans, "plansdsadasddas");
  const handleSubscribe = (id) => {
    console.log(id, "iddplannnnnnnnnnnnnnnnnnnnnnnn");
    subscribeToPlan(id).then((res) => {
      if (res?.status === 201) {
        toast.success("Redirecting to Payment Gateway");
        setPaymentMethod(res?.data?.data?.url);
      }
    });
  };
  return (
    <div className={`${styles.container} `}>
      {plans?.items?.length === 0 ? (
        <div style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <img src="/empty-wishlist.svg" alt="empy cart" />
            <h2>There is no plans available right now</h2>

            <button
              onClick={() => {
                navigate("/");
              }}
              style={{
                backgroundColor: "var(--brown)",
                color: "white",
                border: "none",
                padding: "12px 48px",
                fontWeight: "400",
                fontSize: "18px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Return Home
            </button>
          </div>
        </div>
      ) : (
        <>
          {!isSubscribed && (
            <h1 style={{ display: "block" }}>
              You are currently not Subscribed to any plan{" "}
            </h1>
          )}
          <div style={{ display: "flex", gap: "32px" }}>
            {plans?.items?.map((plan) => (
              <div
                className={`${styles["premium-container"]} margin-container`}
              >
                <div
                  className={`${styles.column} ${styles["premium-head"]}`}
                  style={{ width: "calc(100% - 30px)" }}
                >
                  <div className={styles.row}>
                    <img src={premium} width="50px" />
                    <div>{plan?.name?.en}</div>
                  </div>
                  <div className={styles.row}>
                    <div>{plan?.price}</div>
                    <div>/ {plan?.duration}</div>
                  </div>
                  <div className={styles.row}>
                    <div>Get the best benefits with us</div>
                  </div>
                  <button
                    onClick={() => {
                      handleSubscribe(plan?.id);
                    }}
                    className={`${styles["premium-button"]} ${styles.row}`}
                  >
                    Subscribe to {plan?.name?.en}
                    <ArrowRight2
                      size="15"
                      color="var(--white)"
                      variant="Outline"
                    />
                  </button>
                </div>
                <div
                  className={`${styles.column} ${styles["premium-body"]}`}
                  style={{ width: "calc(100% - 30px)" }}
                >
                  <div style={{ fontWeight: "bold" }}>What’s included?</div>
                  {Object.entries(plan?.extraInfo).map((info) => (
                    <div className={styles.row}>
                      {info[1] ? (
                        <img src={check} width="20px" />
                      ) : (
                        <img src="/failure.svg" style={{ width: "20px" }} />
                      )}
                      <Box
                        sx={{
                          textDecoration: info[1] ? "none" : "line-through",
                        }}
                      >
                        {info[0]}
                      </Box>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {paymentLink && (
        <iframe
          src={paymentLink}
          title="Paymob"
          style={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            zIndex: "9999",
            inset: "0",
          }}
        />
      )}
    </div>
  );
}
