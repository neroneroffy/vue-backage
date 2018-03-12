package com.mingyu.framework.modules.purchase.domain;

import com.mingyu.framework.common.domain.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * 采购清单
 * <p>
 * Create by 王燕林 on 2018/3/3
 */
@Entity
@Table(name = "t_purchase_order_item")
public class PurchaseOrderItem extends BaseEntity {
    /**
     * 采购单唯一标识
     */
    private Integer purchaseOrderId;
    /**
     * 货物唯一标识（根据采购单的采购类型，判断该字段对应的实体，商品、赠品、物料）
     */
    private Integer goodsId;
    /**
     * 货物名称
     */
    @Column(length = 64)
    private String goodsName;
    /**
     * 计量单位唯一标识
     */
    private Integer unitsId;
    /**
     * 采购单价
     */
    @Column(precision = 10, scale = 3)
    private Double purchasePrice;
    /**
     * 采购含税单价
     */
    @Column(precision = 10, scale = 3)
    private Double taxPrice;
    /**
     * 折扣率
     */
    @Column(precision = 10, scale = 3)
    private Double discountRate;
    /**
     * 优惠金额
     */
    @Column(precision = 10, scale = 3)
    private Double discountAmount;
    /**
     * 采购数量
     */
    private Integer num;
    /**
     * 采购总价
     */
    @Column(precision = 10, scale = 3)
    private Double totalPurchasePrice;
    /**
     * 采购单含税总价
     */
    @Column(precision = 10, scale = 3)
    private Double totalTaxPrice;
    /**
     * 仓库唯一标识
     */
    private Integer warehouseId;
    /**
     * 备注
     */
    @Lob
    @Column(columnDefinition = "text")
    private String mark;

    public Integer getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public void setPurchaseOrderId(Integer purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public String getGoodsName() {
        return goodsName;
    }

    public void setGoodsName(String goodsName) {
        this.goodsName = goodsName;
    }

    public Integer getUnitsId() {
        return unitsId;
    }

    public void setUnitsId(Integer unitsId) {
        this.unitsId = unitsId;
    }

    public Double getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(Double purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public Double getTaxPrice() {
        return taxPrice;
    }

    public void setTaxPrice(Double taxPrice) {
        this.taxPrice = taxPrice;
    }

    public Double getDiscountRate() {
        return discountRate;
    }

    public void setDiscountRate(Double discountRate) {
        this.discountRate = discountRate;
    }

    public Double getDiscountAmount() {
        return discountAmount;
    }

    public void setDiscountAmount(Double discountAmount) {
        this.discountAmount = discountAmount;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Double getTotalPurchasePrice() {
        return totalPurchasePrice;
    }

    public void setTotalPurchasePrice(Double totalPurchasePrice) {
        this.totalPurchasePrice = totalPurchasePrice;
    }

    public Double getTotalTaxPrice() {
        return totalTaxPrice;
    }

    public void setTotalTaxPrice(Double totalTaxPrice) {
        this.totalTaxPrice = totalTaxPrice;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }
}
