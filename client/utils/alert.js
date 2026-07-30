import Swal from "sweetalert2";

export const successAlert = (title) => {
  Swal.fire({
    icon: "success",
    title,
    confirmButtonColor: "#4f46e5",
    timer: 1800,
    showConfirmButton: false,
  });
};

export const errorAlert = (title) => {
  Swal.fire({
    icon: "error",
    title,
    confirmButtonColor: "#ef4444",
  });
};

export const warningAlert = (title) => {
  Swal.fire({
    icon: "warning",
    title,
    confirmButtonColor: "#f59e0b",
  });
};

export const confirmAlert = async (title, text) => {

  return await Swal.fire({

    title,

    text,

    icon: "warning",

    showCancelButton: true,

    confirmButtonText: "Yes",

    cancelButtonText: "Cancel",

    confirmButtonColor: "#4f46e5",

    cancelButtonColor: "#ef4444",

  });

};