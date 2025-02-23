import { BrowserRouter as Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function LoginPage() {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8080/api/v1/auth/login", values);
        alert("Login successful");
      } catch (error) {
        alert("Login failed");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={formik.handleSubmit} className="p-6 border rounded">
        <h2 className="text-xl font-bold">Login</h2>
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
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Login</button>
        <p className="mt-2">
          No account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
