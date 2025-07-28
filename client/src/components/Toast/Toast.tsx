import { Bounce, type ToastOptions, toast } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3400,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  transition: Bounce,
};

export function showToast(message: string, options?: ToastOptions) {
  toast(message, { ...defaultOptions, ...options });
}
