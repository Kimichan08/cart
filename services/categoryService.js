import * as http from "~/http/http"

const url = "http://localhost:1108/category"

export const getCate = async () => {
    try{
        const res = await http.get(url)
        return res
    }
    catch (err){
        console.error(err);
    }
}