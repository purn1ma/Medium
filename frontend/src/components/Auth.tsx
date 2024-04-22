import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config/url";

interface SignUpInput {
  name: string;
  username: string;
  password: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
  });

  const onSignUp = async () => {
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        postInput
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      navigate("/blogs");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">Create an account</div>
          <div className="text-l text-slate-400 ">
            Already have an account?
            <Link className="pl-2 underline" to={"/signin"}>
              Log in
            </Link>
            
          </div>
        </div>
        <div>
        <div>
        <LabelledInput
          label="Name"
          placeholder="Purnima"
          onChange={(e) => {
            setPostInput((prev) => ({ ...prev, name: e.target.value }));
          }}
        />
        </div>
        <LabelledInput
          label="Username"
          placeholder="purnima13"
          onChange={(e) => {
            setPostInput((prev) => ({ ...prev, username: e.target.value }));
          }}
        />
        <LabelledInput
          label="Password"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setPostInput((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        {/* </div> */}
        </div>
        <button
          type="button"
          onClick={onSignUp}
          className=" mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({ label, placeholder,type, onChange }: LabelledInputType) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={ type || "text" }
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default SignUp;
