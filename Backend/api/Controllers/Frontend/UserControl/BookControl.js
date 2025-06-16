const bookmodel = require("../../../Models/Frontend/UserModel/bookModel");
const { v4: uuidv4 } = require("uuid");

const selectrides = (req, res) => {
  bookmodel.selectrides((err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
};


// const getcommision = () =>{
//     bookmodel.getcommision((err,result) =>{
//         if(err){
//             console.log(err);
//             }
//             return result;
//     })
// }
// const fixcommision =  getcommision()
// console.log("this is commision " , fixcommision);

// const gettax_percentage1 = () =>{
//     bookmodel.gettax_percentage((err,result) =>{
//         if(err){
//             console.log(err);
//             }
//             console.log(result[0].value);
            
//             return result[0].value;
//     })
// }


const bookrides = (req, res) => {
  console.log(req.body);
  const userid = req.userID;
  function generateCustombookingid(prefix = "BK") {
    const uuid = uuidv4().replace(/\D/g, "").substring(0, 6);
    return `${prefix}-${userid}-${uuid}`;
  }
  function generateCustomroutekey(prefix = "route_key_sample_") {
    const uuid = uuidv4().replace(/\D/g, "").substring(0, 6);
    return `${prefix}${userid}${uuid}`;
  }
  const booking_id = generateCustombookingid();
  const statusfun = (req) => {
    if (req.body.bookingtype === "Schedule") {
      const schedule_at = `${req.body.bookingDate} ${req.body.bookingTime}`;
      return { status: "SCHEDULED", scheduleAt: schedule_at };
    } else {
      return { status: "SEARCHING" };
    }
  };
  const schedule_at = statusfun(req).scheduleAt;
  const status = statusfun(req).status;
  const route_key = generateCustomroutekey();
  const current_provider_id = 0;
  const payment_mode_paid = () => {
    if (req.body.payment_mode === "CASH") {
      return 0;
    } else {
      return 1;
    }
  };
  const paid = payment_mode_paid();
  const data = {
    booking_id,
    userid,
    status,
    route_key,
    current_provider_id,
    paid,
    schedule_at,
    ...req.body,
  };
  console.log("this is final data ", data);
  bookmodel.bookrides(data, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("booking request sent successfully" , result);
bookmodel.getcommisionandtax((err, resultss) => {
    if (err) {
        console.log(err);
        }
        console.log("commision and tax sent successfully" , resultss);
        console.log(resultss[0].value , resultss[1].value);
        

        const request_id = result.insertId;
        console.log("this is dtata" , request_id);
        const payment_mode = req.body.paymentMethod;
        const distance = req.body.distance;
        const commision = (req.body.price * resultss[0].value )/100
        const price_without_commision = parseFloat((req.body.price - commision).toFixed(2))
        const tax =  req.body.price - ((req.body.price * resultss[1].value) /100 ) ;
        const Totaltax = parseFloat((req.body.price - tax).toFixed(2))
        const total = req.body.price ;
        const provider_commission =  parseFloat((total - commision).toFixed(2))
        const provider_pay = provider_commission
        const data ={
            request_id, payment_mode, price_without_commision, distance, commision, Totaltax, total ,provider_commission , provider_pay
        }
         bookmodel.user_request_payment(data , (err, result) => {
            if (err) {
                console.log(err);
                }
                console.log("payment request sent successfully" , result);
            })
          })
    res.status(200).send(result);
  });
};

module.exports = { selectrides, bookrides };
