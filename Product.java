package com.mingyu.framework.modules.common.domain;

import com.mingyu.framework.common.domain.BaseEntity;

import javax.persistence.*;

/**
 * 产品
 * <p>
 * Create by 王燕林 on 2018/3/2
 */
@Entity
@Table(name = "t_base_product")
public class Product extends BaseEntity {
    /**
     * 产品名称
     */
    @Column(length = 64)
    private String productName;
    /**
     * 产品编号
     */
    @Column(length = 64)
    private String productCode;
    /**
     * 条形码
     */
    @Column(length = 64)
    private String barCode;
    /**
     * 产品分类
     */
    @Column(length = 16)
    private String category;
    /**
     * 产品型号
     */
    @Column(length = 32)
    @Enumerated(EnumType.STRING)
    private ModelSizeEnum modelSize;
    /**
     * 备注
     */
    @Lob
    @Column(columnDefinition = "text")
    private String mark;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getBarCode() {
        return barCode;
    }

    public void setBarCode(String barCode) {
        this.barCode = barCode;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ModelSizeEnum getModelSize() {
        return modelSize;
    }

    public void setModelSize(ModelSizeEnum modelSize) {
        this.modelSize = modelSize;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }
}
