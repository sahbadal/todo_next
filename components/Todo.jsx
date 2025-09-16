import React from 'react'

const Todo = ({ id, title, description, complete, mongoId, deleteTodo, completeTodo }) => {
    return (
        <tr className="bg-white border-b border-gray-200">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {id + 1}
            </th>
            <td className={complete ? "line-through" : ""}>{title}</td>
            <td className={complete ? "line-through" : ""}>{description}</td>
            <td className="px-6 py-4">{complete ? "Completed" : "Pending"}</td>
            <td className="px-6 py-4 flex gap-1">
                <button onClick={() => deleteTodo(mongoId)} className='py-2 px-4 bg-red-500 text-white cursor-pointer'>Delete</button>
                {complete ? null : <button onClick={() => completeTodo(mongoId)} className='py-2 px-4 bg-green-500 text-white cursor-pointer'>Done</button>}
            </td>
        </tr>
    )
}

export default Todo