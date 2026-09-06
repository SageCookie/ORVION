package com.orvion.domain.quality;

import com.orvion.common.exception.ResourceNotFoundException;
import com.orvion.domain.production.ProductionOrder;
import com.orvion.domain.production.ProductionOrderRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class QualityCheckService {
    private final QualityCheckRepository qualityCheckRepository;
    private final ProductionOrderRepository productionOrderRepository;

    public QualityCheckService(QualityCheckRepository qualityCheckRepository,
                               ProductionOrderRepository productionOrderRepository) {
        this.qualityCheckRepository = qualityCheckRepository;
        this.productionOrderRepository = productionOrderRepository;
    }

    @Transactional(readOnly = true)
    public Page<QualityCheck> getQualityChecks(int page, int size) {
        return qualityCheckRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional
    public QualityCheck createQualityCheck(QualityCheckCreateRequest req) {
        ProductionOrder prod = productionOrderRepository.findById(req.getProductionOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Production order not found"));

        int passed = req.getPassedQuantity() != null ? req.getPassedQuantity() : 0;
        int rejected = req.getRejectedQuantity() != null ? req.getRejectedQuantity() : 0;
        int inspected = req.getInspectedQuantity() != null ? req.getInspectedQuantity() : (passed + rejected);

        String resultStr = rejected == 0 ? "PASSED" : (passed > 0 ? "REWORK" : "FAILED");

        QualityCheck qc = QualityCheck.builder()
                .checkNumber("QC-" + System.currentTimeMillis() % 100000)
                .productionOrder(prod)
                .inspectedQuantity(inspected)
                .passedQuantity(passed)
                .rejectedQuantity(rejected)
                .result(resultStr)
                .inspectorName(req.getInspectorName() != null ? req.getInspectorName() : "Quality Team")
                .inspectionDate(LocalDate.now())
                .notes(req.getNotes())
                .build();

        prod.setProducedQuantity(passed);
        prod.setRejectedQuantity(rejected);
        if ("PASSED".equals(resultStr)) {
            prod.setStatus("COMPLETED");
            prod.setActualCompletionDate(LocalDate.now());
        } else if ("REWORK".equals(resultStr)) {
            prod.setStatus("REWORK");
        } else {
            prod.setStatus("CANCELLED");
        }
        productionOrderRepository.save(prod);

        return qualityCheckRepository.save(qc);
    }
}
