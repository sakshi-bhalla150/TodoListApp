import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-slate-800 text-white py-2'>
      <div className="logo my-2">
        <span className='font-bold text-xl mx-9 flex justify-center '>TodoTasks</span>
      </div>
      <ul className="flex gap-8 mx-9 my-2">
        <li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-50'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
