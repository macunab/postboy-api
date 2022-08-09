import { Request, Response } from "express";
import requestModel from "../models/request.model";


class RequestController {

    async createRequest(req: Request, res: Response) {
        const request = req.body;
        const { collection } = req.params;
        request.owner = collection;
        try {
            const requestQuery = new requestModel(request);
            await requestQuery.save();
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
            await requestModel.findByIdAndUpdate(id, request);
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

    // todo performance pre
    // Probar mandando el id directo al metodo delete y el owner aparte
    async deleteRequest(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const request = await requestModel.findById(id);
            if(!request) {
                return res.status(400).json({
                    ok: false,
                    msg: 'cant find request'
                });
            }
            await requestModel.deleteOne(id);
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