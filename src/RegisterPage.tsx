import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function RegisterPage() {
  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", phoneNumber: "", email: "", password: "", confirmPassword: "" },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string().matches(/^[0-9]{10}$/, "Invalid phone number").required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8080/api/v1/auth/sign-up", values);
        alert("Registration successful");
      } catch (error) {
        alert("Registration failed");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={formik.handleSubmit} className="p-6 border rounded">
        <h2 className="text-xl font-bold">Register</h2>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className="border p-2 w-full mt-2"
        />
        {formik.errors.firstName && <div className="text-red-500">{formik.errors.firstName}</div>}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className="border p-2 w-full mt-2"
        />
        {formik.errors.lastName && <div className="text-red-500">{formik.errors.lastName}</div>}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={formik.handleChange}
          value={formik.values.phoneNumber}
          className="border p-2 w-full mt-2"
        />
        {formik.errors.phoneNumber && <div className="text-red-500">{formik.errors.phoneNumber}</div>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="border p-2 w-full mt-2"
        />
        {formik.errors.email && <div className="text-red-500">{formik.errors.email}</div>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="border p-2 w-full mt-2"
        />
        {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="border p-2 w-full mt-2"
        />
        {formik.errors.confirmPassword && <div className="text-red-500">{formik.errors.confirmPassword}</div>}
        <button type="submit" className="mt-4 p-2 bg-green-500 text-white rounded">Register</button>
        <p className="mt-2">
          Have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterPage;
