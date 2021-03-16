import axios from "../../../utils/axios";



export const getPoint=async function (data) {
    let Data=new FormData()
    Data.append('coordinateList',data)
    const result=await axios.post('/api/getpoint',Data)
    return result.data
}
