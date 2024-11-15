import { connectToDB } from "@/utils/Database";
import Property from "@/models/Property";
import axios from "axios";
import parse from "node-html-parser";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/Responses";
import { notifications } from "@/utils/Notifications";

export const POST = async (req) => {
    try {
        await connectToDB();

        const { url } = await req.json()

        const data = await fetchInformationFromTheUrl(url)
        const root = parse(data);
        const location = root.querySelector('.auto-suggest__tag-text')?.text.trim() || null
        const properties = root.querySelectorAll('.mb-srp__list')
            .map(card => ({
                price: card.querySelector('.mb-srp__card__price--amount')?.text.trim() || null,
                title: card.querySelector('.mb-srp__card--title')?.text.trim() || null,
                picture: card.querySelector('img')?.getAttribute('src') || null,
                location: location
            }));

        if (properties && properties?.length) {
            await Property.insertMany(properties)
        } else {
            return sendErrorResponse(false, "500", notifications.PROPERTIES_ERROR, [])
        }
        return sendSuccessResponse(true, "200", notifications.PROPERTIES_SUCCESS, properties)
    } catch (error) {
        return sendErrorResponse(false, "500", error?.message ? error?.message : notifications.PROPERTIES_ERROR, [])
    }
};


const fetchInformationFromTheUrl = async (url) => {
    const { data } = await axios.get(url);
    return data;
}

