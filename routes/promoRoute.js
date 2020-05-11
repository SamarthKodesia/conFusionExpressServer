const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Promotions = require('../models/promotions');

const PromotionRouter = express.Router();

PromotionRouter.use(bodyParser.json());

PromotionRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Promotions.find({})
            .then((Promotions) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotions);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Promotions.create(req.body)
            .then((Promotion) => {
                console.log("Promotion Created", Promotion);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /Promotions');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Promotions.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


PromotionRouter.route('/:PromotionId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Promotions.findById(req.params.PromotionId)
            .then((Promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /Promotions/' + req.params.PromotionId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.PromotionId, {
            $set: req.body
        }, { new: true })
            .then((Promotion) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(Promotion);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Promotions.findByIdAndRemove(req.params.PromotionId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

    module.exports = PromotionRouter;