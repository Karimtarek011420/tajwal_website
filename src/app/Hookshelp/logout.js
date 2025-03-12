import axios from "axios";
import Swal from "sweetalert2";
import { API_BASE_URL } from "../utils/config";

// A refactored logoutApi function
export const logoutApi = async (
  token,
  settoken,
  logoutUrl = `${API_BASE_URL}/logout`
) => {
  try {
    const { data } = await axios.get(logoutUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (data.success) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "تم تسجيل الخروج بنجاح",
        showConfirmButton: false,
        timer: 500,
        toast: true,
        background: "#4b87a4",
        color: "white",
        iconColor: "white",
        padding: "10px 20px",
        width: 400,
        timerProgressBar: true,
      });

      setTimeout(() => {
        settoken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }, 500);
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "يرجى المحاولة مرة أخرى لاحقًا";

    Swal.fire({
      position: "top",
      icon: "error",
      title: "فشل تسجيل الخروج",
      showConfirmButton: false,
      timer: 1000,
      toast: true,
      background: "#e14f72",
      color: "white",
      iconColor: "white",
      padding: "20px",
      width: 400,
      timerProgressBar: true,
    });

    // Log the error for debugging
    console.error("Logout API Error:", error);
  }
};
