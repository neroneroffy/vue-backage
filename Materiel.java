package com.mingyu.framework.modules.common.domain;

import com.mingyu.framework.common.domain.BaseEntity;

import javax.persistence.*;

/**
 * 物料
 * <p>
 * Create by 王燕林 on 2018/3/2
 */
@Entity
@Table(name = "t_base_materiel")
public class Materiel extends BaseEntity {
    /**
     * 物料名称
     */
    @Column(length = 64)
    private String materielName;
    /**
     * 物料编号
     */
    @Column(length = 64)
    private String materielCode;
    /**
     * 条形码
     */
    @Column(length = 64)
    private String barCode;
    /**
     * 物料分类
     */
    @Column(length = 64)
    private String category;
    /**
     * 备注
     */
    @Lob
    @Column(columnDefinition = "text")
    private String mark;

    public String getMaterielName() {
        return materielName;
    }

    public void setMaterielName(String materielName) {
        this.materielName = materielName;
    }

    public String getMaterielCode() {
        return materielCode;
    }

    public void setMaterielCode(String materielCode) {
        this.materielCode = materielCode;
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

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }
}
