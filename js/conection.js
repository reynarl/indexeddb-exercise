export let db
export default function conection(){
  const createdb = window.indexedDB.open('crm', 1)

  createdb.onerror = () =>{
    console.log('Error en la conexión')
  }

  createdb.onsuccess = () =>{
    db = createdb.result
  }

  createdb.onupgradeneeded = (e) =>{
    const data = e.target.result

    const store = data.createObjectStore('crm', {
      keyPath: 'id',
      autoIncrement: true
    })

    store.createIndex('name', 'name', { unique: false })
    store.createIndex('email', 'email', { unique: true })
    store.createIndex('tel', 'tel', { unique: false })
    store.createIndex('company', 'company', { unique: false })
    store.createIndex('id', 'id', { unique: true })

    console.log('DB creada exitosamente')
  }
}