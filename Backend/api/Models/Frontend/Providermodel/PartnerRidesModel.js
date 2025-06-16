const db =  require ("../../../config/dbconnection")

const getrides = (callback) => {
    const query = `
     SELECT ur.*, 
      rp.Total AS fixed
FROM user_requests ur
 LEFT JOIN user_request_payments rp ON ur.id = rp.request_id
WHERE ur.status = 'SEARCHING' `
   
    db.query(query,(err,results)=>{
        if(err){
            return callback(err)
        }
        return callback(null,results)
    })
}

const getprovider = ( id , callback) => {
    const query = `SELECT service_type_id FROM provider_services where status = 'active' AND provider_id = 98`
    db.query(query,[id],(err,results)=>{
        if(err){
            return callback(err)
        }
       
        
        return callback(null,results)
    })
}   


module.exports = {getrides,getprovider}