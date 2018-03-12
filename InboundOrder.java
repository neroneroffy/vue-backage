package com.mingyu.framework.modules.purchase.domain;

import com.mingyu.framework.common.domain.BaseEntity;
import com.mingyu.framework.modules.common.domain.Units;
import com.mingyu.framework.modules.common.domain.Warehouse;

import javax.persistence.*;

/**
 * 入库单（购货单）
 * <p>
 * Create by 王燕林 on 2018/3/3
 */
@Entity
@Table(name = "t_purchase_inbound_order")
public class InboundOrder extends BaseEntity {
    /**
     * 单据编码
     */
    @Column(length = 64)
    private String orderNo;
    /**
     * 关联采购单
     */
    @Column(length = 64)
    private String purchaseOrderNo;
    /**
     * 入库类型
     */
    @Column(length = 32)
    @Enumerated(EnumType.STRING)
    private InboundTypeEnum inboundType;
    /**
     * 入库人员唯一标识
     */
    private Integer operatorId;
    /**
     * 备注
     */
    @Lob
    @Column(columnDefinition = "text")
    private String mark;

    public String getOrderNo() {
        return orderNo;
    }

    public void setOrderNo(String orderNo) {
        this.orderNo = orderNo;
    }

    public String getPurchaseOrderNo() {
        return purchaseOrderNo;
    }

    public void setPurchaseOrderNo(String purchaseOrderNo) {
        this.purchaseOrderNo = purchaseOrderNo;
    }

    public InboundTypeEnum getInboundType() {
        return inboundType;
    }

    public void setInboundType(InboundTypeEnum inboundType) {
        this.inboundType = inboundType;
    }

    public Integer getOperatorId() {
        return operatorId;
    }

    public void setOperatorId(Integer operatorId) {
        this.operatorId = operatorId;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }
}
