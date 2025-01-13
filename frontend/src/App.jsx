import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import DefaultLayout from './Layout/DefaultLayout'
import Homepage from './Pages/Homepage'


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<DefaultLayout />}>
                        <Route path='/' element={<Homepage />} />
                    </Route>
                </Routes>

            </BrowserRouter>
        </>
    )

}

export default App
