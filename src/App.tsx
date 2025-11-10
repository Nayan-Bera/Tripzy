import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import { Toaster } from "react-hot-toast";
import PopupReminder from "./components/common/popupReminder/PopupReminder";
// import AutoRecaptcha from "./components/common/AutoRecaptcha";
import { AutoRecaptcha } from "./components/common/AutoRecaptcha";


import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;


function App() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
      <Toaster position="top-center" reverseOrder={false} />
      <PopupReminder />
      <AutoRecaptcha />
      <RouterProvider router={router} />
    </GoogleReCaptchaProvider>
  );
}

export default App;



