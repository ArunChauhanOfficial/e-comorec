import validate from "deep-email-validator";


const emailVlid = async (email) => {
    const {valid , reason} = await validate(email);


    if(valid){
        return true
    }

    return false
    
}

export default emailVlid;