import { instance } from "./request";
export function getDetail(iid) {
  return instance({
    url: "/detail",
    params: { iid },
  });
}

export function getRecommend() {
  return instance({
    url: "recommend",
  });
}

export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.topImages = itemInfo.topImages;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discounnt = itemInfo.discountDesc;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.lowNowPrice;
  }
}

export class Shop {
  constructor(shopinfo) {
    this.logo = shopinfo.shopLogo;
    this.name = shopinfo.name;
    this.fans = shopinfo.cFans;
    this.sells = shopinfo.cSells;
    this.score = shopinfo.score;
    this.goodsCount = shopinfo.cGoods;
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.image ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
