import { useNavigate } from 'react-router-dom';
import PortalLayout from "../layout/PortalLayout";
import './Profile.css'; // Asegúrate de que este archivo exista y esté correctamente configurado

const Profile = () => {
  const navigate = useNavigate();

  // Funciones para manejar los clics en los botones
  const handleCrudClick = () => {
    window.location.href = "http://localhost:3000/"; // Ruta al archivo HTML en la carpeta public del servidor en el puerto 3000
  };

  const handleLogoutClick = () => {
    window.location.href = "http://localhost:5173/"; // Ruta al archivo HTML en la carpeta public del servidor en el puerto 3000
  };

  const handleAdditionalButtonClick = () => {
    window.location.href = "http://localhost:5173/dashboard"; // Ruta al archivo HTML en la carpeta public del servidor en el puerto 3000
  };

  return (
    <PortalLayout>
      <div className="profile-container">
        <h1 className="profile-title">
          Usted acaba de iniciar sesión en el portal de administración de CELL WD. Desde esta opción podrá gestionar las tareas de sus colaboradores y la información de sus productos. Por favor, seleccione una opción:
        </h1>
        <button className="crud-button" onClick={handleCrudClick}>
          CRUD CELL WD
        </button>
        <button className="logout-button" onClick={handleLogoutClick}>
          Volver a Iniciar Sesión
        </button>
        <button className="additional-button" onClick={handleAdditionalButtonClick}>
          Botón Adicional
        </button>
      </div>
    </PortalLayout>
  );
}

export default Profile;
