<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


// Conecta a la base de datos  con usuario, contraseña y name de la BD
$server = "localhost";
$user = "root";
$pass = "";
$nameBD = "phang_crud";
$conn = new mysqli($server, $user, $pass, $nameBD);
$table_employees="employees";


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["get"])) {
  $sqlEmpleaados = mysqli_query($conn, "SELECT * FROM $table_employees WHERE id=" . $_GET["get"]);
  if (mysqli_num_rows($sqlEmpleaados) > 0) {
    $empleaados = mysqli_fetch_all($sqlEmpleaados, MYSQLI_ASSOC);
    echo json_encode($empleaados);
    exit();
  }
  else {
    echo json_encode(["success" => false]);
  }
  exit();
}

//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["delete"])) {
  $sqlEmpleaados = mysqli_query($conn, "DELETE FROM $table_employees WHERE id=" . $_GET["delete"]);
  if ($sqlEmpleaados) {
    echo json_encode(["success" => 1]);
    exit();
  }
  else {
    echo json_encode(["success" => 0]);
  }
  exit();
}
//Inserta un nuevo registro y recepciona en método post los datos de name y email
if (isset($_GET["insert"])) {
  $data = json_decode(file_get_contents("php://input"));
  $name = $data->name;
  $email = $data->email;
  if (($email != "") && ($name != "")) {
    $sqlEmpleaados = mysqli_query($conn, "INSERT INTO $table_employees(name,email) VALUES('$name','$email') ");
    echo json_encode(["success" => 1]);
  }
  exit();
}
// Actualiza datos pero recepciona datos de name, email y una clave para realizar la actualización
if (isset($_GET["update"])) {

  $data = json_decode(file_get_contents("php://input"));

  $id = (isset($data->id)) ? $data->id : $_GET["update"];
  $name = $data->name;
  $email = $data->email;

  $sqlEmpleaados = mysqli_query($conn, "UPDATE $table_employees SET name='$name',email='$email' WHERE id='$id'");
  echo json_encode(["success" => 1]);
  exit();
}
// Consulta todos los registros de la tabla empleados
$sqlEmployees = mysqli_query($conn, "SELECT * FROM $table_employees ");
if (mysqli_num_rows($sqlEmployees) > 0) {
  $employees = mysqli_fetch_all($sqlEmployees, MYSQLI_ASSOC);
  echo json_encode($employees);
}
else {
  echo json_encode([["success" => 0]]);
}

?>