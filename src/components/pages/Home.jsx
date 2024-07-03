import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
    <h1 className="text-3xl font-bold text-center p-10">Metadrob Test</h1>
    <div className="flex justify-center gap-4 mt-4">
        <Link to="/3d-models" className="bg-blue-500 text-white px-4 py-2 rounded-md">3D Models</Link>
        <Link to="/2d-models" className="bg-green-500 text-white px-4 py-2 rounded-md">2D Models</Link>
    </div>
</div>
  )
}

export default Home
