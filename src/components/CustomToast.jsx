import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../index.css' // Your custom styles

// ORANGE BACKGROUND
export const notifySuccess = (message) => {
  toast.success(message, {
    className: 'red-bg',
    bodyClassName: 'custom-toast-body',
    hideProgressBar: true,  // Removes loading spinner
    autoClose: 3000,        // Closes after 3 seconds
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    position: "top-right"
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    className: 'red-bg',
    bodyClassName: 'custom-toast-body',
    hideProgressBar: true,  // Removes loading spinner
    autoClose: 3000,        // Closes after 3 seconds
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    position: "top-right"
  });
};

