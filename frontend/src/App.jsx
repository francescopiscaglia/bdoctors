import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './Layout/DefaultLayout'
import Homepage from './Pages/Homepage'
import AddDoctor from './Pages/AddDoctor'
import DoctorPage from './Pages/DoctorPage'

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route path='/' element={<Homepage />} />

                        <Route path='/add' element={<AddDoctor />}></Route>

                        <Route path='/:id' element={<DoctorPage />} />

                    </Route>
                </Routes>

            </BrowserRouter>
        </>
    )

}

export default App
