import conection, {db} from './conection.js'

conection()

const addClienteBtn = document.getElementById('addClientBtn')
addClienteBtn.addEventListener('click', validation)

function validation(){
  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const tel = document.getElementById('tel').value
  const company = document.getElementById('company').value
  
  if(name === '' || email === '' || tel === '' || company === '' ){
    showAlert('Todos los campos son obligatorios', 'error')
  }else{
    const cliente = {
      name: name,
      email: email,
      tel: tel,
      company: company
    }
  
    cliente.id = Date.now()
    crearCliente(cliente)
  
    function crearCliente(cliente){
      const transaction = db.transaction(['crm'], 'readwrite')
      const store = transaction.objectStore('crm')
  
      store.add(cliente)
  
      transaction.onerror = () =>{
        showAlert('El correo ya se encuentra registrado','error')
      }
  
      transaction.oncomplete = () =>{
        showAlert('Registro exitoso')
      }
    }
  }

 
}
  
  function showAlert(msg, type){
    const setMsg = document.getElementById('setMsg')
    const divMsg = document.createElement('div')
    divMsg.className = 'msgContainer'
  
    type === 'error' ? divMsg.classList.add('error') : divMsg.classList.add('success')
    divMsg.textContent = msg
    setMsg.appendChild(divMsg)
  
    setTimeout(() =>{
      divMsg.remove()
    },3000)
  }