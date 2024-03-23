import React from 'react'

const UserInputComponent = ({ id, name, type, heading, handleInputs, Inputs }) => {
  return (
    <div className="inputs">
      <label htmlFor={id}>{heading}</label>
      <input
        type={type}
        name={name}
        id={id}
        onChange={handleInputs}
        value={Inputs[name]}
      />
    </div>

  )
}

export default UserInputComponent
