import React from "react";
import "../../public/css/home.css";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { rename } from "../store/slices/user.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const submit = ({ coach }) => {
    dispatch(rename(coach));
    navigate("/pokedex");
  };

  return (
    <div className="home">
      <div className="home__container">
        <img src="images/pokedex.png" alt="" />
        <div>
          <h1>¡Hello coach!</h1>
          <p>To start, give me your name</p>
        </div>
        <div>
          <form onSubmit={handleSubmit(submit)}>
            <input
              placeholder="your name"
              autoComplete="of"
              type="text"
              name="coach"
              {...register("coach")}
            />
            <button>Start</button>
          </form>
        </div>
      </div>
      <div className="header__footer">
        <div className="header__red">
          <div className="header__circle">
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
