// frontend/src/components/SweetComponent.js
import Swal from 'sweetalert2';

export function showSuccess(message = 'Success!') {
  Swal.fire({
    icon: 'success',
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
}

export function showError(message = 'Error!', text = '') {
  Swal.fire({
    icon: 'error',
    title: message,
    text,
  });
}

export function showConfirm(message = 'Are you sure?', onConfirm) {
  Swal.fire({
    title: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel',
  }).then((result) => {
    if (result.isConfirmed && onConfirm) {
      onConfirm();
    }
  });
}
