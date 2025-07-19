import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"

const secret = process.env.JWT_SECRET!
export const ExtractDataFromToken = async (req: NextRequest) => {

    try {
        const data = req.cookies.get("token")?.value || "";

        const decodedData = jwt.verify(data, secret); 

        if(decodedData) {
            //@ts-ignore
            return decodedData.id
        }

        return null;
    } catch (error: any) {
        throw new Error(error)
    }
 
   
}