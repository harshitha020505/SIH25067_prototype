import React from 'react'
import Button from './Button';

export default function Button12() {
    return (
        <div className='flex flex-col items-center mt-10 gap-10 mb-10'>
            <button className="px-6 py-2 rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
                Gradient Blue
            </button>
            <button className="px-6 py-2 rounded-xl bg-blue-500/20 backdrop-blur-lg border border-blue-300/30 text-blue-900 shadow-md hover:bg-blue-500/30 transition-all duration-300">
                Glass Blue
            </button>

            <button className="px-6 py-2 rounded-xl bg-blue-100 shadow-[8px_8px_16px_#93c5fd,-8px_-8px_16px_#ffffff] text-blue-700 hover:shadow-[inset_8px_8px_16px_#93c5fd,inset_-8px_-8px_16px_#ffffff] transition-all duration-300">
                Blue 12
            </button>

            <button className="px-6 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-600 hover:text-white transition-all duration-300">
                Outline Blue
            </button>

            <button className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 text-white font-medium shadow-md hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300">
                Blue Action
            </button>
            <button className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 hover:shadow-xl transition-all duration-300">
                Material Blue
            </button>
            <button className="relative px-6 py-2 text-blue-600 font-semibold group">
                Underline Blue
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button className="relative px-6 py-2 rounded-xl bg-white text-blue-600 font-semibold border-2 border-blue-600 overflow-hidden group">
                <span className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                <span className="relative z-10 group-hover:text-white">Border Glow</span>
            </button>
            <Button text='Rasagna'/>







        </div>
    )
}
