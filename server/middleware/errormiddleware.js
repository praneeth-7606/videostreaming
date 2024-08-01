// const error
import errorresponse from "../utils/errorresponse";
const errorhandler=(err,req,res,next)=>{
    let error={...err}
    err.message=err.message

    if(err.name==="castError"){
        const message='resources not found'
        error=new errorresponse(message,404

        )
        // duplicate key
        if(err.code===11000){
            const message="Duplicate field value entered"
            error=new errorresponse(message,400)
        }
        if(err.name==="VALIDATIONERROR"){
            const message=object.values(err.erros).map(val=>val.message)
            error=new errorresponse(message,400)
            res.statsu(500).json({success:false,
                error:error.message||"server error"})
        }
    }

}
module.exports=errorhandler