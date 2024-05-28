import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import styles from "../../styles/components/Popup.module.css";
import {
  addressSchema,
  addressSchemaInitialValues,
} from "../../utils/schemas/addressSchema.js";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import { AddAddress } from "../../utils/apiCalls.js";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  // maxWidth: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  // p: 4,
  padding: "20px",
  outline: "none",
  border: "none",
  borderRadius: "10px",
};
const onSubmit = async (values) => {
  const parametres = {
    phone: values.phone_number,
    name: values.first_name + " " + values.last_name,
 
    ...values,
  };
  const resAddress = await AddAddress(parametres);
  if (resAddress.status)
    toast.success("Address added successfully");
  console.log(resAddress, "address valuessss");
};
export default function AddressModal({ open, setOpen }) {
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: addressSchemaInitialValues,
    validationSchema: addressSchema,
    onSubmit,
  });
  console.log(values, "values123123");
  return (
    <Modal open={open}>
      <form onSubmit={handleSubmit}>
        <Box
          sx={style}
          className={styles.form_container}
          style={{ maxHeight: "650px", overflow: "auto" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div className={`${styles.title} ${styles.item}`}>
              Address Detail
            </div>
            <CloseIcon
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
          {/* Phone Number */}
          <div className={styles.item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>Phone Number</span>
              <span className={styles.error}> *</span>
              {errors.phone_number && touched.phone_number && (
                <span className="error">{errors.phone_number}</span>
              )}
            </div>

            <input
              value={values.address_label}
              onChange={handleChange}
              id="phone_number"
              onBlur={handleBlur}
              className={
                errors.phone_number && touched.phone_number
                  ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.item} ${styles.bottom_margin}`
              }
              placeholder="000"
            ></input>
          </div>
          <div style={{ display: "flex", width: "100%" }}>
            {/* First Name */}
            <div style={{ flex: 1 }} className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>First Name</span>
                <span className={styles.error}> *</span>
                {errors.first_name && touched.first_name && (
                  <span className="error">{errors.first_name}</span>
                )}
              </div>

              <input
                value={values.first_name}
                onChange={handleChange}
                id="first_name"
                onBlur={handleBlur}
                className={
                  errors.first_name && touched.first_name
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="000"
              ></input>
            </div>

            {/* Last Name */}
            <div style={{ flex: 1 }} className={styles.item}>
              <div className={`${styles.label} ${styles.item}`}>
                <span>Last Name</span>
                <span className={styles.error}> *</span>
                {errors.last_name && touched.last_name && (
                  <span className="error">{errors.last_name}</span>
                )}
              </div>

              <input
                value={values.last_name}
                onChange={handleChange}
                id="last_name"
                onBlur={handleBlur}
                className={
                  errors.last_name && touched.last_name
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                placeholder="000"
              ></input>
            </div>
          </div>
          {/* type */}

          <div className={styles.item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>Type</span>
              <span className={styles.error}> *</span>

              {errors.type && touched.type && (
                <span className="error">{errors.type}</span>
              )}
            </div>
            <FormControl  fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="type"
                value={values.type}
                variant="standard"
                name="type"
                style={{ height: "40px" }}
                className={
                  errors.type && touched.type
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                onChange={handleChange}
              >
                <MenuItem  value="Home">Home</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
              </Select>
            </FormControl>
          </div>
          
          {/* primary */}
          <div className={styles.item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>Primary</span>
              <span className={styles.error}> *</span>

              {errors.primary && touched.primary && (
                <span className="error">{errors.primary}</span>
              )}
            </div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Primary</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="primary"
                value={values.primary}
                variant="standard"
                name="primary"
                style={{ height: "40px" }}
                className={
                  errors.primary && touched.primary
                    ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                    : `${styles.input} ${styles.item} ${styles.bottom_margin}`
                }
                onChange={handleChange}
              >
                <MenuItem value={true} >True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* address */}
          <div className={styles.item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>Address</span>
              <span className={styles.error}> *</span>

              {errors.address && touched.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
            <input
              value={values.address}
              onChange={handleChange}
              id="address"
              type="address"
              onBlur={handleBlur}
              className={
                errors.address && touched.address
                  ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.item} ${styles.bottom_margin}`
              }
              placeholder="Your address"
            ></input>
          </div>
          {/* province */}
          <div className={styles.semi_item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>governorate</span>
              <span className={styles.error}> *</span>

              {errors.governorate && touched.governorate && (
                <span className="error">{errors.governorate}</span>
              )}
            </div>
            <input
              value={values.governorate}
              onChange={handleChange}
              id="governorate"
              type="number"
              onBlur={handleBlur}
              className={
                errors.governrate && touched.governrate
                  ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.item} ${styles.bottom_margin}`
              }
              placeholder="Province"
            ></input>
          </div>
          {/* city */}
          <div className={styles.semi_item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>City</span>
              <span className={styles.error}> *</span>

              {errors.city && touched.city && (
                <span className="error">{errors.city}</span>
              )}
            </div>
            <input
              value={values.city}
              onChange={handleChange}
              id="city"
              type="number"
              onBlur={handleBlur}
              className={
                errors.city && touched.city
                  ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.item} ${styles.bottom_margin}`
              }
              placeholder="City"
            ></input>
          </div>
          {/* district */}
          <div className={styles.semi_item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>District</span>
              <span className={styles.error}> *</span>

              {errors.district && touched.district && (
                <span className="error">{errors.district}</span>
              )}
            </div>
            <input
              value={values.district}
              onChange={handleChange}
              id="district"
              type="district"
              onBlur={handleBlur}
              className={
                errors.district && touched.district
                  ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.item} ${styles.bottom_margin}`
              }
              placeholder="District"
            ></input>
          </div>
          {/* postal code */}
          <div className={styles.semi_item}>
            <div className={`${styles.label} ${styles.item}`}>
              <span>Postal code</span>
              <span className={styles.error}> *</span>

              {errors.postal_code && touched.postal_code && (
                <span className="error">{errors.postal_code}</span>
              )}
            </div>
            <input
              value={values.postal_code}
              onChange={handleChange}
              id="postal_code"
              type="postal_code"
              onBlur={handleBlur}
              className={
                errors.postal_code && touched.postal_code
                  ? `${styles.input} ${styles.item} ${styles.bottom_margin} input-error`
                  : `${styles.input} ${styles.item} ${styles.bottom_margin}`
              }
              placeholder="Enter Code"
            ></input>
          </div>
          <button className={`${styles.brown_button} ${styles.item}`}>
            Save
          </button>
        </Box>
      </form>
    </Modal>
  );
}
