package com.orvion.domain.quality;

import com.orvion.domain.production.ProductionOrder;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDate;

@Entity
@Table(name = "quality_checks")
public class QualityCheck {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String checkNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "production_order_id", nullable = false)
    private ProductionOrder productionOrder;

    @Column(nullable = false)
    private Integer inspectedQuantity;

    @Column(nullable = false)
    private Integer passedQuantity;

    @Column(nullable = false)
    private Integer rejectedQuantity;

    @Column(nullable = false, length = 20)
    private String result;

    @Column(nullable = false, length = 100)
    private String inspectorName;

    @Column(nullable = false)
    private LocalDate inspectionDate;

    @Column(length = 500)
    private String notes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public QualityCheck() {}

    public QualityCheck(Long id, String checkNumber, ProductionOrder productionOrder, Integer inspectedQuantity, Integer passedQuantity, Integer rejectedQuantity, String result, String inspectorName, LocalDate inspectionDate, String notes, Instant createdAt) {
        this.id = id;
        this.checkNumber = checkNumber;
        this.productionOrder = productionOrder;
        this.inspectedQuantity = inspectedQuantity;
        this.passedQuantity = passedQuantity;
        this.rejectedQuantity = rejectedQuantity;
        this.result = result;
        this.inspectorName = inspectorName;
        this.inspectionDate = inspectionDate;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public static QualityCheckBuilder builder() { return new QualityCheckBuilder(); }

    public static class QualityCheckBuilder {
        private Long id;
        private String checkNumber;
        private ProductionOrder productionOrder;
        private Integer inspectedQuantity;
        private Integer passedQuantity;
        private Integer rejectedQuantity;
        private String result;
        private String inspectorName;
        private LocalDate inspectionDate;
        private String notes;
        private Instant createdAt;

        public QualityCheckBuilder id(Long id) { this.id = id; return this; }
        public QualityCheckBuilder checkNumber(String checkNumber) { this.checkNumber = checkNumber; return this; }
        public QualityCheckBuilder productionOrder(ProductionOrder productionOrder) { this.productionOrder = productionOrder; return this; }
        public QualityCheckBuilder inspectedQuantity(Integer inspectedQuantity) { this.inspectedQuantity = inspectedQuantity; return this; }
        public QualityCheckBuilder passedQuantity(Integer passedQuantity) { this.passedQuantity = passedQuantity; return this; }
        public QualityCheckBuilder rejectedQuantity(Integer rejectedQuantity) { this.rejectedQuantity = rejectedQuantity; return this; }
        public QualityCheckBuilder result(String result) { this.result = result; return this; }
        public QualityCheckBuilder inspectorName(String inspectorName) { this.inspectorName = inspectorName; return this; }
        public QualityCheckBuilder inspectionDate(LocalDate inspectionDate) { this.inspectionDate = inspectionDate; return this; }
        public QualityCheckBuilder notes(String notes) { this.notes = notes; return this; }
        public QualityCheckBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public QualityCheck build() {
            return new QualityCheck(id, checkNumber, productionOrder, inspectedQuantity, passedQuantity, rejectedQuantity, result, inspectorName, inspectionDate, notes, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCheckNumber() { return checkNumber; }
    public void setCheckNumber(String checkNumber) { this.checkNumber = checkNumber; }
    public ProductionOrder getProductionOrder() { return productionOrder; }
    public void setProductionOrder(ProductionOrder productionOrder) { this.productionOrder = productionOrder; }
    public Integer getInspectedQuantity() { return inspectedQuantity; }
    public void setInspectedQuantity(Integer inspectedQuantity) { this.inspectedQuantity = inspectedQuantity; }
    public Integer getPassedQuantity() { return passedQuantity; }
    public void setPassedQuantity(Integer passedQuantity) { this.passedQuantity = passedQuantity; }
    public Integer getRejectedQuantity() { return rejectedQuantity; }
    public void setRejectedQuantity(Integer rejectedQuantity) { this.rejectedQuantity = rejectedQuantity; }
    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }
    public String getInspectorName() { return inspectorName; }
    public void setInspectorName(String inspectorName) { this.inspectorName = inspectorName; }
    public LocalDate getInspectionDate() { return inspectionDate; }
    public void setInspectionDate(LocalDate inspectionDate) { this.inspectionDate = inspectionDate; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
