import axios from 'axios'

export const addPayment=async(req,res,next)=>{
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
        "app_token": process.env.FLOUCI_PUBLIC, 
        "app_secret": process.env.FLOUCI_SECRET,
        "amount": req.body.amount,
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": `http://localhost:5173/?amount=${req.body.amount}&`,
        "fail_link": "http://localhost:5173/",
        "developer_tracking_id": process.env.FLOUCI_TRACKING_ID
    }
    await axios
    .post(url,payload)
    .then(result=>{
        res.send(result.data)
    })
    .catch(err =>console.error(err))
}

export const verifyPayment=async (req,res,next)=>{
    const id_payment =req.params.id
    const url=`https://developers.flouci.com/api/verify_payment/${id_payment}`
    await axios.get(url,{headers : {
        
        'apppublic': process.env.FLOUCI_PUBLIC,
        'appsecret': process.env.FLOUCI_SECRET
      }})
    .then(result=>{
        res.send(result.data)
        
    })
    .catch(err=>{console.error(err)})
}