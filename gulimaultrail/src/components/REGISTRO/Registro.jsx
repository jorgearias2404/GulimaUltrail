import { FaPersonRunning } from "react-icons/fa6"; //RUNNER
import "./Registro.css";

// const formulario = document.getElementById("register-form");
// const botonesCancelar = document.querySelectorAll(".cancelar");
// const inputs = formulario.querySelectorAll("input"); // Selecciona todos los inputs dentro del formulario

// formulario.addEventListener("submit", function (event) {
//   // Aquí puedes agregar la lógica para enviar los datos del formulario
//   console.log("Formulario enviado");
//   // event.preventDefault(); // Descomenta esta línea si no quieres que la página se recargue al enviar
// });

// botonesCancelar.forEach((button) => {
//   button.addEventListener("click", function () {
//     inputs.forEach((input) => {
//       input.value = ""; // Limpia el valor de cada input
//     });
//     // Opcional: Puedes restablecer otros elementos del formulario aquí si es necesario
//   });
// });

function Registro() {
  return (
    <div className="body-registro">
      <div className="title-div">
        <svg
          className="title-svg"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.2641 0.932421C19.323 -0.00859416 17.802 -0.00859416 16.8609 0.932421L15.5676 2.22148L19.7742 6.42813L21.0676 5.13477C22.0086 4.19375 22.0086 2.67266 21.0676 1.73164L20.2641 0.932421ZM7.40781 10.3855C7.1457 10.6477 6.94375 10.9699 6.82773 11.3266L5.55586 15.1422C5.43125 15.5117 5.53008 15.9199 5.80508 16.1992C6.08008 16.4785 6.48828 16.573 6.86211 16.4484L10.6777 15.1766C11.0301 15.0605 11.3523 14.8586 11.6187 14.5965L18.8074 7.40352L14.5965 3.19258L7.40781 10.3855ZM4.125 2.75C1.84766 2.75 0 4.59766 0 6.875V17.875C0 20.1523 1.84766 22 4.125 22H15.125C17.4023 22 19.25 20.1523 19.25 17.875V13.75C19.25 12.9895 18.6355 12.375 17.875 12.375C17.1145 12.375 16.5 12.9895 16.5 13.75V17.875C16.5 18.6355 15.8855 19.25 15.125 19.25H4.125C3.36445 19.25 2.75 18.6355 2.75 17.875V6.875C2.75 6.11445 3.36445 5.5 4.125 5.5H8.25C9.01055 5.5 9.625 4.88555 9.625 4.125C9.625 3.36445 9.01055 2.75 8.25 2.75H4.125Z"
            fill="#B34036"
          />
        </svg>
        <h1 className="title underline">REGISTRO DE CORREDORES</h1>
      </div>
      <div className="register-container">
        <section className="register-section">
          <div className="title-div">
            <FaPersonRunning className="title-svg" />
            <h2 className="subtitle bolder underline">DATOS DEL CORREDOR</h2>
          </div>
          <form action="/" className="register-form">
            <div className="form-inputs">
              <label htmlFor="nombre" className="bold">
                NOMBRE Y APELLIDO:
              </label>
              <input type="text" id="nombre" />
            </div>
            <div className="form-inputs">
              <label htmlFor="cedula" className="bold">
                CÉDULA:
              </label>
              <input type="number" id="cedula" />
            </div>
            <div className="form-inputs">
              <label htmlFor="nacimiento" className="bold">
                FECHA DE NACIMIENTO:
              </label>
              <input type="date" id="nacimiento" />
            </div>
            <div className="form-inputs">
              <label htmlFor="sexo" className="bold">
                SEXO:
              </label>
              <select name="sexo" id="sexo" className="select">
                <option value="null"></option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div className="form-inputs">
              <label htmlFor="Residencia" className="bold">
                ESTADO DE RESIDENCIA:
              </label>
              <select name="sexo" id="sexo" className="select">
                <option value="null"></option>
                <option value="caracas">Caracas</option>
                <option value="miranda">Miranda</option>
                <option value="aragua">Aragua</option>
                <option value="zulia">Zulia</option>
              </select>
            </div>
          </form>
          <div className="title-div">
            <svg
              className="title-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
              <path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm90.7 96.7c9.7-2.6 19.9 2.3 23.7 11.6l20 48c3.4 8.2 1 17.6-5.8 23.2L168 231.7c16.6 35.2 45.1 63.7 80.3 80.3l20.2-24.7c5.6-6.8 15-9.2 23.2-5.8l48 20c9.3 3.9 14.2 14 11.6 23.7l-12 44C336.9 378 329 384 320 384C196.3 384 96 283.7 96 160c0-9 6-16.9 14.7-19.3l44-12z" />
            </svg>
            <h2 className="subtitle bolder underline">CONTACTO</h2>
          </div>
          <form action="/" className="register-form">
            <div className="form-inputs">
              <label htmlFor="correo" className="bold">
                CORREO ELECTRÓNICO:
              </label>
              <input type="text" id="correo" />
            </div>
            <div className="form-inputs" id="contacto">
              <label htmlFor="telefono" className="bold">
                TELÉFONO DE CONTACTO:
              </label>
              <div id="contacto-div">
                <select name="codigo-tlf" id="codigo-tlf" className="select">
                  <option value="null"></option>
                  <option value="0412">0412</option>
                  <option value="0416">0416</option>
                  <option value="0426">0426</option>
                  <option value="0414">0414</option>
                  <option value="0424">0424</option>
                </select>
                <input type="text" id="numero-tlf" />
              </div>
            </div>
          </form>
        </section>
        <section className="register-section">
          <div className="title-div">
            <svg
              className="title-svg"
              width="35"
              height="28"
              viewBox="0 0 35 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M29.2624 2.23817C28.7482 1.72393 28.7482 0.892397 29.2624 0.38363C29.7765 -0.125138 30.6079 -0.130608 31.1166 0.38363L34.6171 3.88483C34.8633 4.131 35 4.46471 35 4.81483C35 5.16495 34.8633 5.49866 34.6171 5.74484L31.1166 9.24603C30.6024 9.76027 29.7711 9.76027 29.2624 9.24603C28.7537 8.73179 28.7482 7.90026 29.2624 7.39149L30.5204 6.13325L21.0033 6.12231C20.2758 6.12231 19.6906 5.53695 19.6906 4.80936C19.6906 4.08177 20.2758 3.49641 21.0033 3.49641H30.5259L29.2624 2.23817ZM5.74308 20.6194L4.48508 21.8777H14.0022C14.7296 21.8777 15.3149 22.463 15.3149 23.1906C15.3149 23.9182 14.7296 24.5036 14.0022 24.5036H4.47961L5.73762 25.7618C6.25176 26.2761 6.25176 27.1076 5.73762 27.6164C5.22347 28.1251 4.39209 28.1306 3.88342 27.6164L0.382872 24.1206C0.13674 23.8745 0 23.5408 0 23.1906C0 22.8405 0.13674 22.5068 0.382872 22.2606L3.88342 18.7594C4.39756 18.2452 5.22894 18.2452 5.73762 18.7594C6.24629 19.2737 6.25176 20.1052 5.73762 20.614L5.74308 20.6194ZM5.25082 3.49641H18.4818C18.2794 3.8903 18.1591 4.33342 18.1591 4.80936C18.1591 6.37943 19.4335 7.65408 21.0033 7.65408H27.4246C27.2058 8.58409 27.4574 9.59615 28.1794 10.3237C29.2897 11.4343 31.0892 11.4343 32.1996 10.3237L33.2552 9.26791V21.0024C33.2552 22.9335 31.6854 24.5036 29.7546 24.5036H16.5237C16.7261 24.1097 16.8464 23.6666 16.8464 23.1906C16.8464 21.6206 15.572 20.3459 14.0022 20.3459H7.58087C7.79966 19.4159 7.54805 18.4038 6.82607 17.6763C5.71574 16.5657 3.91624 16.5657 2.80591 17.6763L1.75027 18.7321V6.99761C1.75027 5.06648 3.32005 3.49641 5.25082 3.49641ZM8.75137 6.99761H5.25082V10.4988C7.18159 10.4988 8.75137 8.92874 8.75137 6.99761ZM29.7546 17.5012C27.8239 17.5012 26.2541 19.0713 26.2541 21.0024H29.7546V17.5012ZM17.5027 19.2518C18.8953 19.2518 20.2309 18.6985 21.2156 17.7136C22.2003 16.7287 22.7536 15.3929 22.7536 14C22.7536 12.6071 22.2003 11.2713 21.2156 10.2864C20.2309 9.30152 18.8953 8.74821 17.5027 8.74821C16.1101 8.74821 14.7746 9.30152 13.7898 10.2864C12.8051 11.2713 12.2519 12.6071 12.2519 14C12.2519 15.3929 12.8051 16.7287 13.7898 17.7136C14.7746 18.6985 16.1101 19.2518 17.5027 19.2518Z" />
            </svg>
            <h2 className="subtitle bolder underline">DEPÓSITO</h2>
          </div>
          <form action="/" className="register-form">
            <div className="form-inputs">
              <label htmlFor="deposito" className="bold">
                FECHA DEL DEPÓSITO:
              </label>
              <input type="date" id="deposito" />
            </div>
            <div className="form-inputs">
              <label htmlFor="referencia" className="bold">
                NÚMERO DE REFERENCIA:
              </label>
              <input type="number" id="referencia" />
            </div>
            <div className="form-inputs">
              <label htmlFor="referencia" className="bold">
                BANCO DE ORIGEN:
              </label>
              <input type="number" id="referencia" />
            </div>
          </form>

          <div className="title-div">
            <svg
              className="title-svg"
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1.57143 0C2.44062 0 3.14286 0.670312 3.14286 1.5V2.25L6.53125 1.44375C8.40223 0.998437 10.3763 1.20469 12.1049 2.02969C14.3786 3.11719 17.0549 3.11719 19.3286 2.02969L19.8 1.80469C20.8116 1.31719 22 2.02031 22 3.09844V16.2094C22 16.8328 21.5924 17.3953 20.9786 17.6156L19.2746 18.225C17.0058 19.0359 14.4817 18.9094 12.3161 17.8781C10.4549 16.9875 8.32366 16.7672 6.30045 17.25L3.14286 18V22.5C3.14286 23.3297 2.44062 24 1.57143 24C0.702232 24 0 23.3297 0 22.5V18.75V15.6562V3V1.5C0 0.670312 0.702232 0 1.57143 0ZM3.14286 8.77031L6.28571 8.11875V11.1891L3.14286 11.8406V14.9062L5.53929 14.3344C5.78973 14.2734 6.03527 14.2219 6.28571 14.1797V11.1844L8.19598 10.7906C8.60357 10.7063 9.01607 10.6734 9.42857 10.6922V7.69219C10.0964 7.71094 10.7643 7.81406 11.4125 7.99219L12.5714 8.31562V11.4422L10.5237 10.8656C10.1652 10.7672 9.79688 10.7063 9.42857 10.6875V14.0344C10.4991 14.1234 11.5549 14.3484 12.5714 14.7094V11.4375L13.6862 11.7516C14.3491 11.9391 15.0268 12.0516 15.7143 12.0984V9.08906C15.3312 9.05156 14.9482 8.98125 14.575 8.87812L12.5714 8.31562V5.40938C11.933 5.23125 11.3045 4.99688 10.6955 4.70625C10.2929 4.51406 9.86562 4.37812 9.42857 4.29375V7.6875C8.79018 7.66875 8.15179 7.725 7.52812 7.85625L6.28571 8.11875V4.59375L3.14286 5.34375V8.77031ZM15.7143 15.7359C16.5393 15.8063 17.379 15.7031 18.1696 15.4172L18.8571 15.1734V11.8125L18.4692 11.8969C17.5656 12.0984 16.6375 12.1641 15.7143 12.1078V15.7359ZM18.8571 8.73281V5.41406C17.8308 5.7 16.775 5.84062 15.7143 5.84062V9.09375C16.3969 9.15938 17.0893 9.11719 17.7621 8.97187L18.8571 8.72812V8.73281Z" />
            </svg>
            <h2 className="subtitle bolder underline">CARRERA</h2>
          </div>
          <form action="/" className="register-form">
            <div className="form-inputs">
              <label htmlFor="referencia" className="bold">
                CATEGORÍA:
              </label>
              <select name="categoria" className="select">
                <option value="null"></option>
                <option value="sub-15">Sub 15 (6K)</option>
                <option value="sub-18">Sub 18 (6K)</option>
                <option value="libre">Libre 18-29 años</option>
                <option value="submaster-a">Submaster A 30-34 años</option>
                <option value="submaster-b">Submaster B 35-39 años</option>
                <option value="master-a">Master A 40-44 años</option>
                <option value="master-b">Master B 45-49 años</option>
                <option value="master-c">Master C 50-54 años</option>
                <option value="master-d">Master D 55-59 años</option>
                <option value="master-e">Master E 60 y + años</option>
              </select>
            </div>
            <div className="form-inputs" id="contacto">
              <label htmlFor="distancia" className="bold">
                DISTANCIA:
              </label>
              <div id="distancia-div">
                <select name="distancia" id="distancia" className="select">
                  <option value="null"></option>
                  <option value="6K">6K Caminata</option>
                  <option value="11K">11K Carrera</option>
                  <option value="21K">21K Carrera</option>
                  <option value="45K">45K Carrera</option>
                </select>
                <input type="text" id="distancia-nro" readOnly />
              </div>
            </div>
            <div className="form-inputs">
              <label htmlFor="club" className="bold">
                CLUB:
              </label>
              <input type="text" id="club" />
            </div>
          </form>
        </section>
      </div>
      <div className="buttons-container">
        <button type="submit" className="button registrar bolder">
          <svg
            className="paragraph-svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M20.2641 0.932421C19.323 -0.00859416 17.802 -0.00859416 16.8609 0.932421L15.5676 2.22148L19.7742 6.42813L21.0676 5.13477C22.0086 4.19375 22.0086 2.67266 21.0676 1.73164L20.2641 0.932421ZM7.40781 10.3855C7.1457 10.6477 6.94375 10.9699 6.82773 11.3266L5.55586 15.1422C5.43125 15.5117 5.53008 15.9199 5.80508 16.1992C6.08008 16.4785 6.48828 16.573 6.86211 16.4484L10.6777 15.1766C11.0301 15.0605 11.3523 14.8586 11.6187 14.5965L18.8074 7.40352L14.5965 3.19258L7.40781 10.3855ZM4.125 2.75C1.84766 2.75 0 4.59766 0 6.875V17.875C0 20.1523 1.84766 22 4.125 22H15.125C17.4023 22 19.25 20.1523 19.25 17.875V13.75C19.25 12.9895 18.6355 12.375 17.875 12.375C17.1145 12.375 16.5 12.9895 16.5 13.75V17.875C16.5 18.6355 15.8855 19.25 15.125 19.25H4.125C3.36445 19.25 2.75 18.6355 2.75 17.875V6.875C2.75 6.11445 3.36445 5.5 4.125 5.5H8.25C9.01055 5.5 9.625 4.88555 9.625 4.125C9.625 3.36445 9.01055 2.75 8.25 2.75H4.125Z" />
          </svg>
          REGISTRAR
        </button>
        <button type="button" className="button cancelar bolder">
          <svg
            className="paragraph-svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 0.90625C6.55588 0.90625 0.90625 6.55588 0.90625 13.5C0.90625 20.4441 6.55588 26.0938 13.5 26.0938C20.4441 26.0938 26.0938 20.4441 26.0938 13.5C26.0938 6.55588 20.4441 0.90625 13.5 0.90625ZM18.0598 16.6902C18.1535 16.7793 18.2285 16.8862 18.2803 17.0047C18.332 17.1232 18.3596 17.2508 18.3612 17.3801C18.3629 17.5094 18.3386 17.6377 18.2899 17.7575C18.2412 17.8773 18.169 17.9861 18.0775 18.0775C17.9861 18.169 17.8773 18.2412 17.7575 18.2899C17.6377 18.3386 17.5094 18.3629 17.3801 18.3612C17.2508 18.3596 17.1232 18.332 17.0047 18.2803C16.8862 18.2285 16.7793 18.1535 16.6902 18.0598L13.5 14.8702L10.3098 18.0598C10.1266 18.2338 9.88275 18.3294 9.63014 18.3261C9.37752 18.3229 9.13617 18.2211 8.95753 18.0425C8.77889 17.8638 8.6771 17.6225 8.67387 17.3699C8.67063 17.1173 8.76621 16.8734 8.94022 16.6902L12.1298 13.5L8.94022 10.3098C8.76621 10.1266 8.67063 9.88275 8.67387 9.63014C8.6771 9.37752 8.77889 9.13617 8.95753 8.95753C9.13617 8.77889 9.37752 8.6771 9.63014 8.67387C9.88275 8.67063 10.1266 8.76621 10.3098 8.94022L13.5 12.1298L16.6902 8.94022C16.8734 8.76621 17.1173 8.67063 17.3699 8.67387C17.6225 8.6771 17.8638 8.77889 18.0425 8.95753C18.2211 9.13617 18.3229 9.37752 18.3261 9.63014C18.3294 9.88275 18.2338 10.1266 18.0598 10.3098L14.8702 13.5L18.0598 16.6902Z" />
          </svg>
          CANCELAR
        </button>
      </div>
    </div>
  );
}

export default Registro;
