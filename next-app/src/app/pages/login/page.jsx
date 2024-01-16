"use client";
import MainLayout from "@/components/Layouts/MainLayout/index";
import { useState } from "react";
export default function Login() {
  const [dataLogin, setDataLogin] = useState({
    name: "",
    password: "",
  });

  const [loginStatus, setLoginStatus] = useState({});

  const [errorMessage, setErrorMessage] = useState("");

  const [session, setSession] = useState({});

  const getCSRF = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/sanctum/csrf-cookie`,
        {
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      );

      if (response.ok) {
        const csrfToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("XSRF-TOKEN"))
          .split("=")[1];

        setSession({ csrf_token: csrfToken });
        console.log("CSRF Token:", csrfToken);
      } else {
        console.error("Failed to fetch CSRF token");
      }
    } catch (error) {
      console.error(`An error occurred: ${error.message}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const postData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/auth/login`,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": session.csrf_token,
          },
          credentials: "include",
          body: JSON.stringify(dataLogin),
          cache: "no-store",
        }
      );

      console.log("Response Status:", res.status);

      if (res.status === 200) {
        // Successful login
        const responseData = await res.json();
        const role = responseData.role;

        if (role === 0) {
          window.location.href = "/";
        } else if (role === 1) {
          window.location.href = "/pages/admin";
        } else {
          // Handle other cases if needed
          setErrorMessage("Unexpected role received");
        }
      } else if (res.status === 401) {
        // Handle unauthorized (401) error
        setErrorMessage(
          "Invalid credentials. Please check your username and password."
        );
      } else if (res.status === 404) {
        // Handle not found (404) error
        const responseData = await res.json();
        setErrorMessage(responseData.error || "User not found");
      } else if (res.status === 400) {
        // Handle validation or other client-side errors
        const responseData = await res.json();
        setErrorMessage(responseData.error || "Login failed");
        console.error("Login Error:", responseData);
      } else {
        // Handle other server-side errors
        const contentType = res.headers.get("content-type");
        const isJSON = contentType && contentType.includes("application/json");

        if (!isJSON) {
          setErrorMessage(`Login failed with status: ${res.status}`);
          console.error(`Login failed with status: ${res.status}`);
          return;
        }

        const responseData = await res.json();
        setErrorMessage(responseData.message || "Login failed");
        console.error("Login Error:", responseData);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error in postData:", error.message);
      setErrorMessage("An unexpected error occurred during login");
    }
  };

  return (
    <MainLayout>
      <section className="snap-y snap-mandatory h-screen w-full bg-hero bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden">
        <div className="snap-always snap-start w-full h-screen absolute flex justify-center items-center right-[15rem]">
          <div id="content-Hero" className="">
            <h1 className="text-4xl text-shadow font-bold text-white text-center">
              Gereja <span className="block text-white">ST. Markus Melak</span>
            </h1>
            <p className="text-center text-white font-light text-sm text-shadow my-2">
              Temukan lebih banyak tentang komunitas gereja kami <br />
              dengan login sekarang untuk eksplorasi lengkap
            </p>
          </div>
        </div>

        <div className="bg-white p-4 shadow-md overflow-hidden w-[35rem] h-[100vh] fixed top-0 pt-2 right-0">
          <section className="bg-white">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-20">
              <a
                href="#"
                className="flex items-center mb-6 mr-5 text-2xl font-semibold text-primary min-[360px]:max-[555px]:mt-[3rem] "
              >
                <label className="min-[360px]:max-[555px]:ml-[13rem] font-bold" />
                LOGIN
              </a>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0  sm:max-w-md xl:p-0 min-[360px]:max-[555px]:w-[22rem] min-[360px]:max-[555px]:ml-[12.5rem]">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-800 md:text-2xl ">
                    Sign in to your account
                  </h1>
                  {errorMessage != "" ? (
                    <h1 className="text-red-500 font-semibold font-xl">
                      {errorMessage}
                    </h1>
                  ) : (
                    ""
                  )}
                  <form className="space-y-4 md:space-y-6" action={postData}>
                    <div>
                      <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        className="bg-gray-50 border border-yellow-800 text-primary rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400 min-[360px]:max-[555px]:w-72"
                        placeholder="username"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="password"
                        type="password"
                        className="bg-gray-50 border mb-2 border-yellow-800 text-primary rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400 min-[360px]:max-[555px]:w-72"
                        placeholder="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 mt-3 "
                      >
                        Forgot password?
                      </a>
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-primary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  min-[360px]:max-[555px]:w-72"
                    >
                      Login
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet?{" "}
                      <a
                        href="/pages/register"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Sign up
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </MainLayout>
  );
}
