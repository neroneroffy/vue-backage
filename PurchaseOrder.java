package com.mingyu.framework.modules.purchase.domain;

import com.mingyu.framework.common.domain.BaseEntity;

import javax.persistence.*;

/**
 * 采购单
 * <p>
 * Create by 王燕林 on 2018/3/3
 */
@Entity
@Table(name = "t_purchase_order")
public class PurchaseOrder extends BaseEntity {
    /**
     * 采购单编号
     */
    @Column(length = 64)
    private String orderNo;
    /**
     * 供货商唯一标识
     */
    private Integer supplierId;
    /**
     * 采购员唯一标识
     */
    private Integer purchaseId;
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
     * 实际采购总金额
     */
    @Column(precision = 10, scale = 3)
    private Double realTotalPrice;
    /**
     * 交货日期
     */
    private Long receiveTime;
    /**
     * 采购类型
     */
    @Column(length = 32)
    @Enumerated(EnumType.STRING)
    private PurchaseTypeEnum purchaseType;
    /**
     * 采购单状态
     */
    @Column(length = 32)
    @Enumerated(EnumType.STRING)
    private PurchaseStatusEnum status;
    /**
     * 采购单审核状态
     */
    private PurchaseAuditStatusEnum auditStatus;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    public Integer getPurchaseId() {
        return purchaseId;
    }

    public void setPurchaseId(Integer purchaseId) {
        this.purchaseId = purchaseId;
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

    public Double getRealTotalPrice() {
        return realTotalPrice;
    }

    public void setRealTotalPrice(Double realTotalPrice) {
        this.realTotalPrice = realTotalPrice;
    }

    public Long getReceiveTime() {
        return receiveTime;
    }

    public void setReceiveTime(Long receiveTime) {
        this.receiveTime = receiveTime;
    }

    public PurchaseTypeEnum getPurchaseType() {
        return purchaseType;
    }

    public void setPurchaseType(PurchaseTypeEnum purchaseType) {
        this.purchaseType = purchaseType;
    }

    public PurchaseStatusEnum getStatus() {
        return status;
    }

    public void setStatus(PurchaseStatusEnum status) {
        this.status = status;
    }

    public PurchaseAuditStatusEnum getAuditStatus() {
        return auditStatus;
    }

    public void setAuditStatus(PurchaseAuditStatusEnum auditStatus) {
        this.auditStatus = auditStatus;
    }
}
