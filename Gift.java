package com.mingyu.framework.modules.common.domain;

import com.mingyu.framework.common.domain.BaseEntity;

import javax.persistence.*;

/**
 * 赠品
 * <p>
 * Create by 王燕林 on 2018/3/2
 */
@Entity
@Table(name = "t_base_gift")
public class Gift extends BaseEntity {
    /**
     * 赠品名称
     */
    @Column(length = 64)
    private String giftName;
    /**
     * 赠品编号
     */
    @Column(length = 64)
    private String giftCode;
    /**
     * 条形码
     */
    @Column(length = 64)
    private String barCode;
    /**
     * 赠品分类
     */
    @Column(length = 16)
    private String category;
    /**
     * 赠品型号
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

    public String getGiftName() {
        return giftName;
    }

    public void setGiftName(String giftName) {
        this.giftName = giftName;
    }

    public String getGiftCode() {
        return giftCode;
    }

    public void setGiftCode(String giftCode) {
        this.giftCode = giftCode;
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
