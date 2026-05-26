import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setStatus("loading");
      setError("");
      const response = await api.post("/auth/register", form);
      login(response.data.token, response.data.user);
      navigate("/products");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
      setStatus("error");
    }
  };
  return (
    <section className="mx-auto max-w-md rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-stone-900">Create Account</h1>

      <p className="mt-2 text-sm text-stone-600">
        Register to save your cart and checkout faster.
      </p>

      {error && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-stone-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-amber-700"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-md bg-amber-700 px-4 py-2 font-semibold text-white hover:bg-amber-800 disabled:opacity-60"
        >
          {status === "loading" ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-stone-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-amber-700">
          Login
        </Link>
      </p>
    </section>
  );
}

export default Register;
