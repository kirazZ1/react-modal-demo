import { useState } from 'react'
import './App.css'
import Modal from './components/Modal'
function App() {
  const [show,setShow] = useState<boolean>(false)

  

  return (
    <div >
      <button onClick={() => setShow(true)}>onClick</button>
      <Modal destroyOnClose maskClosable show={show} width={600} title={"这是一个标题"} onCancel={() => setShow(false)}>
        <input/>
      </Modal>



    </div>
  )
}

export default App
