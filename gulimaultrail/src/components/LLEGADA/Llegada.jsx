import React, { useState } from "react";
import "./Llegada.css";
import LlegadaAbsolutos from "./LlegadaAbsolutos.jsx";
import LlegadaDescalificados from "./LlegadaDescalificados.jsx";
import LlegadaPodiosCopy from "./LlegadaPodios.jsx";

function ComponentSelector({ personas }) {
  const [visibleComponent, setVisibleComponent] = useState(
    <LlegadaPodiosCopy personas={personas} />
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState("podios");

  const showComponent = (component, buttonName) => {
    setVisibleComponent(component);
    setActiveButton(buttonName);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="body-puntaje">
      {/* Navegación para desktop */}
      <nav className="llegada-container">
        <button
          className={
            activeButton === "absolutos"
              ? "nav-btn2 nav-activo bold"
              : "nav-btn2 nav-inactivo bold"
          }
          onClick={() =>
            showComponent(<LlegadaAbsolutos personas={personas} />, "absolutos")
          }>
          <svg
            className="subtitle-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512">
            <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
          </svg>
          ABSOLUTOS
        </button>

        <button
          className={
            activeButton === "podios"
              ? "nav-btn2 nav-activo bold"
              : "nav-btn2 nav-inactivo bold"
          }
          onClick={() =>
            showComponent(<LlegadaPodiosCopy personas={personas} />, "podios")
          }>
          <svg
            className="subtitle-svg"
            width="25"
            height="23"
            viewBox="0 0 25 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4375 0H8.9375C8.50652 0 8.0932 0.171205 7.78845 0.475951C7.48371 0.780698 7.3125 1.19402 7.3125 1.625V22.5469C7.3125 22.6007 7.3339 22.6524 7.37199 22.6905C7.41009 22.7286 7.46175 22.75 7.51562 22.75H16.8594C16.9132 22.75 16.9649 22.7286 17.003 22.6905C17.0411 22.6524 17.0625 22.6007 17.0625 22.5469V1.625C17.0625 1.19402 16.8913 0.780698 16.5865 0.475951C16.2818 0.171205 15.8685 0 15.4375 0ZM22.75 8.125H19.0938C18.986 8.125 18.8827 8.1678 18.8065 8.24399C18.7303 8.32017 18.6875 8.42351 18.6875 8.53125V22.3438C18.6875 22.4515 18.7303 22.5548 18.8065 22.631C18.8827 22.7072 18.986 22.75 19.0938 22.75H23.1562C23.4795 22.75 23.7895 22.6216 24.018 22.393C24.2466 22.1645 24.375 21.8545 24.375 21.5312V9.75C24.375 9.31902 24.2038 8.9057 23.899 8.60095C23.5943 8.29621 23.181 8.125 22.75 8.125ZM1.625 4.875C1.19402 4.875 0.780698 5.04621 0.475951 5.35095C0.171205 5.6557 0 6.06902 0 6.5V21.5312C0 21.8545 0.128404 22.1645 0.356964 22.393C0.585524 22.6216 0.895517 22.75 1.21875 22.75H5.28125C5.38899 22.75 5.49233 22.7072 5.56851 22.631C5.6447 22.5548 5.6875 22.4515 5.6875 22.3438V5.28125C5.6875 5.17351 5.6447 5.07017 5.56851 4.99399C5.49233 4.9178 5.38899 4.875 5.28125 4.875H1.625Z" />
          </svg>
          PODIOS
        </button>

        <button
          className={
            activeButton === "descalificados"
              ? "nav-btn2 nav-activo bold"
              : "nav-btn2 nav-inactivo bold"
          }
          onClick={() =>
            showComponent(
              <LlegadaDescalificados personas={personas} />,
              "descalificados"
            )
          }>
          <svg
            className="subtitle-svg"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 24 36.2"
            width="24px"
            height="24px">
            <path
              d="M16.9,1.7c0.1,1.5,0.8,2.3,1.6,3.4c0.6,0.7,1.4,2.6,0.6,3.1c-0.3,0.2-0.3,0.2-0.4-0.1c-0.2-1-0.9-1.7-1.5-2.4
	C16.4,4.6,15.9,3.1,16.9,1.7z"
            />
            <path
              d="M22.7,14.8C22.7,14.8,22.7,14.8,22.7,14.8c-0.9-1.7-2.4-4-2.4-4s0.6,3.8,0.1,5.5c-0.5,1.7-1,2.4-1.1,2.4
	c0-0.2-0.2-1.1-0.5-2.2c-0.4-1.4-0.9-3.1-1.4-4.1c0,0,0,0,0,0c-1-1.7-2.6-3.4-2.6-3.4c-0.4-0.4-0.7-0.8-1-1.2
	c-1.1-1.5-1.7-3.2-1.8-5.1c0-0.7,0.4-2.1,0.6-2.7c-2.2,1.1-3.8,2.8-4.8,5.1C7.2,6,7,7,6.9,7.9c-0.2,1.4-0.1,2.8-0.3,4
	c0,0.3-0.1,0.5-0.1,0.8c-0.4,2.1-1.7,3-1.8,3c0,0,0-0.7-0.1-1.5c-0.1-0.4-0.2-0.9-0.4-1.4c-0.2-0.6-0.7-1.2-1.2-1.7
	c-0.7-0.7-1.4-1.3-1.4-1.3C1.7,9.7,2.4,11.4,1.8,14c-0.1,0.4-0.2,0.8-0.4,1.3c-0.3,0.7-0.5,1.4-0.6,2.1c-0.7,2.8-0.8,5.8-0.7,7
	c0,0.4,0.1,1.7,0.6,3.4c0.1,1,0.4,2,1.2,2.8C2,30.5,2,30.6,2.1,30.6c0.1,0.1,0.3,0,0.5-0.1c1.2-0.7,2.4-0.2,2.8,1.2
	c0.2,0.6,0.2,1.2,0.1,1.8c0,0,0,0,0,0.1c-0.1,0.6-0.2,1.2-0.3,1.8c0.6-0.1,2-0.4,2.1,0c0,0.1,0.5-0.4,0.8-0.8
	c0.2,0.1,0.5,0.1,0.7,0.1c0.3,0.4,0.6,1,0.7,1.6c0.2-0.1,0.7-0.9,1.4-1.4c0.2,0,0.3,0,0.5,0c0.5,0,1,0,1.5-0.1
	c0.8,0.5,1.4,1.3,1.5,1.2c0.1-0.3,0.5-1,0.8-1.5c0.2,0,0.3-0.1,0.5-0.1c0.1,0.4,0.5,0.9,0.6,1.1c0.1,0.2,1.5-0.4,1.9-0.2
	c0.1,0.1,0.3,0.2,0.4,0.1c0.1-0.1,0-0.2,0-0.4c-0.1-0.6-0.2-1.2-0.2-1.8c0-0.4,0-0.7,0.1-1.1c0.2-1.6,1.5-2.3,2.9-1.6
	c0,0,0.1,0,0.1,0.1c0.3,0.1,0.4,0.1,0.6-0.1c0.9-0.8,1.2-1.9,1.3-3c0-0.4,0-0.8,0-1.2c0.4-1.5,0.6-2.9,0.6-3.8
	C24.2,19.2,23.5,16.5,22.7,14.8z M9.8,24.6c-0.2,0.8-0.4,1.5-0.9,2.2c0-0.4-1.9,0.2-3.2,0.1c-1-0.1-2.1-0.6-2.3-1.2
	c-0.4-1.2-0.2-2.4,0.7-3.4c0.8-0.9,1.9-1.1,3.1-0.8c0.3,0.1,0.6,0.2,0.9,0.3C8.7,22,9.3,22,9.9,21.7c0.2-0.1,0.2-0.1,0.2,0.1
	C10.2,22.8,10.1,23.7,9.8,24.6z M12.6,31.6c-0.2,0-0.3-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.3-0.4c-0.1,0.2-0.2,0.3-0.2,0.4
	c-0.1,0.2-0.3,0.2-0.6,0.2c-0.6-0.1-0.8-0.3-0.8-0.6c-0.1-0.9,0.2-1.8,0.6-2.6c0.1-0.2,0.3-0.4,0.7-0.4c0.2,0,0.3-0.1,0.5-0.1
	c0.5-0.1,0.7,0,0.9,0.2c0.5,0.9,0.8,1.9,1,2.9C14,31.4,13.5,31.6,12.6,31.6z M20.5,25.9c-0.3,0.6-1.8,0.9-2.2,1
	c-0.7,0.1-3.1-0.5-3.2-0.1c-0.9-1.6-1.3-3.4-1.1-5.3c1,0.7,1.9,0.3,2.8,0c1.3-0.4,2.4-0.1,3.3,0.9C20.8,23.4,21,24.8,20.5,25.9z"
            />
          </svg>
          DESCALIFICADOS
        </button>
      </nav>

      {/* Navegación para móviles */}
      <nav className="llegada-container-mobile">
        <button
          className={
            activeButton === "absolutos"
              ? "nav-btn2 nav-activo bold"
              : "nav-btn2 nav-inactivo bold"
          }
          onClick={() =>
            showComponent(<LlegadaAbsolutos personas={personas} />, "absolutos")
          }>
          <svg
            className="title-svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512">
            <path d="M173.8 5.5c11-7.3 25.4-7.3 36.4 0L228 17.2c6 3.9 13 5.8 20.1 5.4l21.3-1.3c13.2-.8 25.6 6.4 31.5 18.2l9.6 19.1c3.2 6.4 8.4 11.5 14.7 14.7L344.5 83c11.8 5.9 19 18.3 18.2 31.5l-1.3 21.3c-.4 7.1 1.5 14.2 5.4 20.1l11.8 17.8c7.3 11 7.3 25.4 0 36.4L366.8 228c-3.9 6-5.8 13-5.4 20.1l1.3 21.3c.8 13.2-6.4 25.6-18.2 31.5l-19.1 9.6c-6.4 3.2-11.5 8.4-14.7 14.7L301 344.5c-5.9 11.8-18.3 19-31.5 18.2l-21.3-1.3c-7.1-.4-14.2 1.5-20.1 5.4l-17.8 11.8c-11 7.3-25.4 7.3-36.4 0L156 366.8c-6-3.9-13-5.8-20.1-5.4l-21.3 1.3c-13.2 .8-25.6-6.4-31.5-18.2l-9.6-19.1c-3.2-6.4-8.4-11.5-14.7-14.7L39.5 301c-11.8-5.9-19-18.3-18.2-31.5l1.3-21.3c.4-7.1-1.5-14.2-5.4-20.1L5.5 210.2c-7.3-11-7.3-25.4 0-36.4L17.2 156c3.9-6 5.8-13 5.4-20.1l-1.3-21.3c-.8-13.2 6.4-25.6 18.2-31.5l19.1-9.6C65 70.2 70.2 65 73.4 58.6L83 39.5c5.9-11.8 18.3-19 31.5-18.2l21.3 1.3c7.1 .4 14.2-1.5 20.1-5.4L173.8 5.5zM272 192a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM1.3 441.8L44.4 339.3c.2 .1 .3 .2 .4 .4l9.6 19.1c11.7 23.2 36 37.3 62 35.8l21.3-1.3c.2 0 .5 0 .7 .2l17.8 11.8c5.1 3.3 10.5 5.9 16.1 7.7l-37.6 89.3c-2.3 5.5-7.4 9.2-13.3 9.7s-11.6-2.2-14.8-7.2L74.4 455.5l-56.1 8.3c-5.7 .8-11.4-1.5-15-6s-4.3-10.7-2.1-16zm248 60.4L211.7 413c5.6-1.8 11-4.3 16.1-7.7l17.8-11.8c.2-.1 .4-.2 .7-.2l21.3 1.3c26 1.5 50.3-12.6 62-35.8l9.6-19.1c.1-.2 .2-.3 .4-.4l43.2 102.5c2.2 5.3 1.4 11.4-2.1 16s-9.3 6.9-15 6l-56.1-8.3-32.2 49.2c-3.2 5-8.9 7.7-14.8 7.2s-11-4.3-13.3-9.7z" />
          </svg>
        </button>

        <button
          className={
            activeButton === "podios"
              ? "nav-btn2 nav-activo bold"
              : "nav-btn2 nav-inactivo bold"
          }
          onClick={() =>
            showComponent(<LlegadaPodiosCopy personas={personas} />, "podios")
          }>
          <svg
            className="title-svg"
            width="25"
            height="23"
            viewBox="0 0 25 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4375 0H8.9375C8.50652 0 8.0932 0.171205 7.78845 0.475951C7.48371 0.780698 7.3125 1.19402 7.3125 1.625V22.5469C7.3125 22.6007 7.3339 22.6524 7.37199 22.6905C7.41009 22.7286 7.46175 22.75 7.51562 22.75H16.8594C16.9132 22.75 16.9649 22.7286 17.003 22.6905C17.0411 22.6524 17.0625 22.6007 17.0625 22.5469V1.625C17.0625 1.19402 16.8913 0.780698 16.5865 0.475951C16.2818 0.171205 15.8685 0 15.4375 0ZM22.75 8.125H19.0938C18.986 8.125 18.8827 8.1678 18.8065 8.24399C18.7303 8.32017 18.6875 8.42351 18.6875 8.53125V22.3438C18.6875 22.4515 18.7303 22.5548 18.8065 22.631C18.8827 22.7072 18.986 22.75 19.0938 22.75H23.1562C23.4795 22.75 23.7895 22.6216 24.018 22.393C24.2466 22.1645 24.375 21.8545 24.375 21.5312V9.75C24.375 9.31902 24.2038 8.9057 23.899 8.60095C23.5943 8.29621 23.181 8.125 22.75 8.125ZM1.625 4.875C1.19402 4.875 0.780698 5.04621 0.475951 5.35095C0.171205 5.6557 0 6.06902 0 6.5V21.5312C0 21.8545 0.128404 22.1645 0.356964 22.393C0.585524 22.6216 0.895517 22.75 1.21875 22.75H5.28125C5.38899 22.75 5.49233 22.7072 5.56851 22.631C5.6447 22.5548 5.6875 22.4515 5.6875 22.3438V5.28125C5.6875 5.17351 5.6447 5.07017 5.56851 4.99399C5.49233 4.9178 5.38899 4.875 5.28125 4.875H1.625Z" />
          </svg>
        </button>

        <button
          className={
            activeButton === "descalificados"
              ? "nav-btn2 nav-activo bold"
              : "nav-btn2 nav-inactivo bold"
          }
          onClick={() =>
            showComponent(
              <LlegadaDescalificados personas={personas} />,
              "descalificados"
            )
          }>
          <svg
            className="title-svg"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 24 36.2"
            width="24px"
            height="24px">
            <path
              d="M16.9,1.7c0.1,1.5,0.8,2.3,1.6,3.4c0.6,0.7,1.4,2.6,0.6,3.1c-0.3,0.2-0.3,0.2-0.4-0.1c-0.2-1-0.9-1.7-1.5-2.4
	C16.4,4.6,15.9,3.1,16.9,1.7z"
            />
            <path
              d="M22.7,14.8C22.7,14.8,22.7,14.8,22.7,14.8c-0.9-1.7-2.4-4-2.4-4s0.6,3.8,0.1,5.5c-0.5,1.7-1,2.4-1.1,2.4
	c0-0.2-0.2-1.1-0.5-2.2c-0.4-1.4-0.9-3.1-1.4-4.1c0,0,0,0,0,0c-1-1.7-2.6-3.4-2.6-3.4c-0.4-0.4-0.7-0.8-1-1.2
	c-1.1-1.5-1.7-3.2-1.8-5.1c0-0.7,0.4-2.1,0.6-2.7c-2.2,1.1-3.8,2.8-4.8,5.1C7.2,6,7,7,6.9,7.9c-0.2,1.4-0.1,2.8-0.3,4
	c0,0.3-0.1,0.5-0.1,0.8c-0.4,2.1-1.7,3-1.8,3c0,0,0-0.7-0.1-1.5c-0.1-0.4-0.2-0.9-0.4-1.4c-0.2-0.6-0.7-1.2-1.2-1.7
	c-0.7-0.7-1.4-1.3-1.4-1.3C1.7,9.7,2.4,11.4,1.8,14c-0.1,0.4-0.2,0.8-0.4,1.3c-0.3,0.7-0.5,1.4-0.6,2.1c-0.7,2.8-0.8,5.8-0.7,7
	c0,0.4,0.1,1.7,0.6,3.4c0.1,1,0.4,2,1.2,2.8C2,30.5,2,30.6,2.1,30.6c0.1,0.1,0.3,0,0.5-0.1c1.2-0.7,2.4-0.2,2.8,1.2
	c0.2,0.6,0.2,1.2,0.1,1.8c0,0,0,0,0,0.1c-0.1,0.6-0.2,1.2-0.3,1.8c0.6-0.1,2-0.4,2.1,0c0,0.1,0.5-0.4,0.8-0.8
	c0.2,0.1,0.5,0.1,0.7,0.1c0.3,0.4,0.6,1,0.7,1.6c0.2-0.1,0.7-0.9,1.4-1.4c0.2,0,0.3,0,0.5,0c0.5,0,1,0,1.5-0.1
	c0.8,0.5,1.4,1.3,1.5,1.2c0.1-0.3,0.5-1,0.8-1.5c0.2,0,0.3-0.1,0.5-0.1c0.1,0.4,0.5,0.9,0.6,1.1c0.1,0.2,1.5-0.4,1.9-0.2
	c0.1,0.1,0.3,0.2,0.4,0.1c0.1-0.1,0-0.2,0-0.4c-0.1-0.6-0.2-1.2-0.2-1.8c0-0.4,0-0.7,0.1-1.1c0.2-1.6,1.5-2.3,2.9-1.6
	c0,0,0.1,0,0.1,0.1c0.3,0.1,0.4,0.1,0.6-0.1c0.9-0.8,1.2-1.9,1.3-3c0-0.4,0-0.8,0-1.2c0.4-1.5,0.6-2.9,0.6-3.8
	C24.2,19.2,23.5,16.5,22.7,14.8z M9.8,24.6c-0.2,0.8-0.4,1.5-0.9,2.2c0-0.4-1.9,0.2-3.2,0.1c-1-0.1-2.1-0.6-2.3-1.2
	c-0.4-1.2-0.2-2.4,0.7-3.4c0.8-0.9,1.9-1.1,3.1-0.8c0.3,0.1,0.6,0.2,0.9,0.3C8.7,22,9.3,22,9.9,21.7c0.2-0.1,0.2-0.1,0.2,0.1
	C10.2,22.8,10.1,23.7,9.8,24.6z M12.6,31.6c-0.2,0-0.3-0.1-0.3-0.2c-0.1-0.1-0.2-0.2-0.3-0.4c-0.1,0.2-0.2,0.3-0.2,0.4
	c-0.1,0.2-0.3,0.2-0.6,0.2c-0.6-0.1-0.8-0.3-0.8-0.6c-0.1-0.9,0.2-1.8,0.6-2.6c0.1-0.2,0.3-0.4,0.7-0.4c0.2,0,0.3-0.1,0.5-0.1
	c0.5-0.1,0.7,0,0.9,0.2c0.5,0.9,0.8,1.9,1,2.9C14,31.4,13.5,31.6,12.6,31.6z M20.5,25.9c-0.3,0.6-1.8,0.9-2.2,1
	c-0.7,0.1-3.1-0.5-3.2-0.1c-0.9-1.6-1.3-3.4-1.1-5.3c1,0.7,1.9,0.3,2.8,0c1.3-0.4,2.4-0.1,3.3,0.9C20.8,23.4,21,24.8,20.5,25.9z"
            />
          </svg>
        </button>
      </nav>

      {visibleComponent}
    </main>
  );
}

export default ComponentSelector;
