"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const offer_entity_1 = require("./entities/offer.entity");
const typeorm_2 = require("typeorm");
const wishes_service_1 = require("../wishes/wishes.service");
let OffersService = class OffersService {
    constructor(offerRepository, wishesService) {
        this.offerRepository = offerRepository;
        this.wishesService = wishesService;
    }
    async createOffer(createOfferDto, user) {
        const { itemId, amount } = createOfferDto;
        const wish = await this.wishesService.findWishById(itemId);
        if (!wish) {
            throw new common_1.NotFoundException('Пожелание не найдено');
        }
        if (wish.owner.id === user.id) {
            throw new common_1.BadRequestException('Вы не можете поддержать собственное пожелание');
        }
        const totalRaised = +wish.raised + +amount;
        if (totalRaised > +wish.price) {
            throw new common_1.BadRequestException('Вы не можете предложить сумму, превышающую общую стоимость пожелания');
        }
        await this.wishesService.updateRaisedAmount(wish.id, totalRaised);
        const createdOffer = await this.offerRepository.create(Object.assign(Object.assign({}, createOfferDto), { user, item: wish }));
        const savedOffer = await this.offerRepository.save(createdOffer);
        return savedOffer;
    }
    async findAllOffers() {
        const offers = await this.offerRepository.find({
            relations: ['item', 'user'],
        });
        return offers;
    }
    async findOfferById(offerId) {
        const offer = await this.offerRepository.findOne({
            where: { id: offerId },
            relations: ['item', 'user'],
        });
        if (!offer) {
            throw new common_1.NotFoundException('Предложение не найдено');
        }
        const _a = offer.user, { password } = _a, result = __rest(_a, ["password"]);
        return Object.assign(Object.assign({}, offer), { user: result });
    }
};
OffersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(offer_entity_1.Offer)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wishes_service_1.WishesService])
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map