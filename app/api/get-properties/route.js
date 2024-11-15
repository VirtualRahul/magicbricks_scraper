import { connectToDB } from "@/utils/Database";
import Property from "@/models/Property";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/Responses";
import { notifications } from "@/utils/Notifications";

export const GET = async (req) => {
    try {
        await connectToDB();

        const properties = await Property.find({}).sort({createdAt : -1}).exec()

        if (properties) {
            return sendSuccessResponse(true, "200", notifications.PROPERTIES_SUCCESS, properties)
        } else {

            return sendErrorResponse(false, "500", notifications.SOMETING_WENT_WRONG, [])
        }
    } catch (error) {
        return sendErrorResponse(false, "500", `Something went wrong:${error?.message}`, [])
    }
};
