import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ShowErrorMsg, ShowSuccessMsg } from '../../../utils/notification/notification';


const ActivateEmail = () => {

  const { activation_token } = useParams()
  const [err, setErr] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (activation_token) {
      const activateEmail = async () => {
        try {
          const res = await axios.post('/api/v1/auth/activate', { activation_token })
          setSuccess(res.data.msg)
        } catch (error) {
          setErr('')
        }
      }
      activateEmail()
    }
  }, [activation_token])

  return (
    <div className='activate_email'>
      {err && ShowErrorMsg(err)}
      {success && ShowSuccessMsg(success)}
    </div>
  )
}

export default ActivateEmail