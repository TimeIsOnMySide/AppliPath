import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
    const onDragEnd = (result) => {
        console.log('on drag end');
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <div className="pages home flex-container">
                    <DragDropContext onDragEnd={onDragEnd()}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </DragDropContext>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
