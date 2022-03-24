import { BadGatewayException } from "@nestjs/common";
import { isUUID } from "class-validator";
import { Types } from "mongoose";

export function convertToObjectId(value: string) {
    return new Types.ObjectId(value);
}