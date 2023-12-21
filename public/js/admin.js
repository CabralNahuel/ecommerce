function eliminarProducto(product_id) {
  confirm("¿Estás seguro de que quieres eliminar este producto?");
  fetch(`/admin/delete/${product_id}`, {
    method: "DELETE",
  });
  window.location.reload();
}
