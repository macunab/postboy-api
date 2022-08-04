import { Request, Response } from "express";
import { request } from "http";
import requestModel from "../models/request.model";


class RequestController {

    async createRequest(req: Request, res: Response) {
        const request = req.body;
        const { collection } = req.params;
        try {
            await requestModel.createRequest(request, collection);
            res.status(200).json({
                ok: true,
                msg: 'Request create successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying create a request, error: ${err}`
            });
        }
    }

    async updateRequest(req: Request, res: Response) {
        const { id } = req.params;
        const request = req.body;
        try {
            await requestModel.updateRequest(id, request);
            res.status(200).json({
                ok: true,
                msg: 'Request updated successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying update a request, error: ${err}`
            });
        }
    }

    async deleteRequest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            await requestModel.deleteRequest(id);
            res.status(200).json({
                ok: true,
                msg: 'Request delete successfully'
            });
        } catch(err) {
            res.status(400).json({
                ok: false,
                msg: `An error ocurred while trying delete a request, error: ${err}`
            });
        }
    }
}

export default new RequestController();