// думаю можно придумать что то получше, сделано на скорую руку было

export default ( res, message, status) => {
    if(status){
        res.status = status
    }

    let erObj = {
        message: message?message:"Server Error",
    }

    return res.json(erObj);
}