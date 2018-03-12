package com.mingyu.framework.modules.purchase.domain;

import com.mingyu.framework.common.domain.BaseEntity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Lob;
import javax.persistence.Table;

/**
 * 入库清单（购货清单）
 * <p>
 * Create by 王燕林 on 2018/3/3
 */
@Entity
@Table(name = "t_purchase_inbound_order_item")
public class InboundOrderItem extends BaseEntity {
    /**
     * 入库单唯一标识
     */
    private Integer inboundOrderId;
    /**
     * 仓库唯一标识
     */
    private Integer warehouseId;
    /**
     * 货物唯一标识（根据采购单的采购类型，判断该字段对应的实体，商品、赠品、物料）
     */
    private Integer goodsId;
    /**
     * 计量单位唯一标识
     */
    private Integer unitsId;
    /**
     * 入库单价
     */
    @Column(precision = 10,scale = 3)
    private Double price;
    /**
     * 入库数量
     */
    private Integer num;
    /**
     * 总金额
     */
    @Column(precision = 10,scale = 3)
    private Double total;
    /**
     * 备注
     */
    @Lob
    @Column(columnDefinition = "text")
    private String mark;

    public Integer getInboundOrderId() {
        return inboundOrderId;
    }

    public void setInboundOrderId(Integer inboundOrderId) {
        this.inboundOrderId = inboundOrderId;
    }

    public Integer getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Integer warehouseId) {
        this.warehouseId = warehouseId;
    }

    public Integer getGoodsId() {
        return goodsId;
    }

    public void setGoodsId(Integer goodsId) {
        this.goodsId = goodsId;
    }

    public Integer getUnitsId() {
        return unitsId;
    }

    public void setUnitsId(Integer unitsId) {
        this.unitsId = unitsId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getNum() {
        return num;
    }

    public void setNum(Integer num) {
        this.num = num;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }
}
