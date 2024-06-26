// JavaScript para interactuar con el backend y actualizar la interfaz de usuario
document.addEventListener('DOMContentLoaded', () => {
    const formPaciente = document.getElementById('formPaciente');
    const formDoctor = document.getElementById('formDoctor');
    const formCita = document.getElementById('formCita');
  
    // Evento submit para agregar paciente
    formPaciente.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombrePaciente').value;
      const edad = document.getElementById('edadPaciente').value;
      const direccion = document.getElementById('direccionPaciente').value;
      
      fetch('/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, edad, direccion })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Mostrar respuesta del servidor en consola
        fetchPacientes(); // Actualizar lista de pacientes
        formPaciente.reset(); // Limpiar formulario
      })
      .catch(error => console.error('Error al agregar paciente:', error));
    });
  
    // Evento submit para agregar doctor
    formDoctor.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombreDoctor').value;
      const especialidad = document.getElementById('especialidadDoctor').value;
      
      fetch('/doctores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, especialidad })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Mostrar respuesta del servidor en consola
        fetchDoctores(); // Actualizar lista de doctores
        formDoctor.reset(); // Limpiar formulario
      })
      .catch(error => console.error('Error al agregar doctor:', error));
    });
  
    // Evento submit para agregar cita
    formCita.addEventListener('submit', (e) => {
      e.preventDefault();
      const paciente_id = document.getElementById('pacienteIdCita').value;
      const doctor_id = document.getElementById('doctorIdCita').value;
      const fecha_cita = document.getElementById('fechaCita').value;
      const motivo = document.getElementById('motivoCita').value;
      
      fetch('/citas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paciente_id, doctor_id, fecha_cita, motivo })
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Mostrar respuesta del servidor en consola
        fetchCitas(); // Actualizar lista de citas
        formCita.reset(); // Limpiar formulario
      })
      .catch(error => console.error('Error al agregar cita:', error));
    });
  
    // Función para obtener y mostrar pacientes
    function fetchPacientes() {
      fetch('/pacientes')
        .then(response => response.json())
        .then(data => {
          const pacientesDiv = document.getElementById('pacientes');
          pacientesDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => console.error('Error al obtener pacientes:', error));
    }
  
    // Función para obtener y mostrar doctores
    function fetchDoctores() {
      fetch('/doctores')
        .then(response => response.json())
        .then(data => {
          const doctoresDiv = document.getElementById('doctores');
          doctoresDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => console.error('Error al obtener doctores:', error));
    }
  
    // Función para obtener y mostrar citas
    function fetchCitas() {
      fetch('/citas')
        .then(response => response.json())
        .then(data => {
          const citasDiv = document.getElementById('citas');
          citasDiv.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
        })
        .catch(error => console.error('Error al obtener citas:', error));
    }
  
    // Cargar datos al cargar la página
    fetchPacientes();
    fetchDoctores();
    fetchCitas();
  });
  