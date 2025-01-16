import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import DefaultLayout from './Layout/DefaultLayout'
import Homepage from './Pages/Homepage'
import AddDoctor from './Pages/AddDoctor'
import DoctorPage from './Pages/DoctorPage'
import AdvancedResearch from './Components/AdvancedSearch'
import GlobalContext from './context/GlobalContext'

function App() {

    const [selectedDepartment, setSelectedDepartment] = useState("");


    const values = {
        selectedDepartment,
        setSelectedDepartment
    };

    return (
        <>
            <GlobalContext.Provider value={values}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<DefaultLayout />}>
                            <Route path='/' element={<Homepage />} />
                            <Route path='/add' element={<AddDoctor />}></Route>
                            <Route path='/:slug' element={<DoctorPage />} />
                            <Route path='/search' element={<AdvancedResearch />} />
                        </Route>
                    </Routes>

                </BrowserRouter>

            </GlobalContext.Provider>

        </>
    )

}

export default App
