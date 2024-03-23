import React from 'react'

const OtpComponent = ({ setShowVerification, oneTimePassword, handleInputs }) => {
    return (
        <>
            <h2>Vericication</h2>
            <div className="inputs">
                <input type="text" name='digit1' value={oneTimePassword.digit1} onChange={handleInputs} />
                <input type="text" name='digit2' value={oneTimePassword.digit2} onChange={handleInputs} />
                <input type="text" name='digit3' value={oneTimePassword.digit3} onChange={handleInputs} />
                <input type="text" name='digit4' value={oneTimePassword.digit4} onChange={handleInputs} />
            </div>
            <div className="controls">
                <button type='button' className='btn' onClick={() => setShowVerification(false)}>Prev</button>
                <button type='submit' className='btn' >Submit</button>
            </div>
        </>
    )
}

export default OtpComponent
