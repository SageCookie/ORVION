package com.orvion.domain.audit;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuditLogService {
    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional(readOnly = true)
    public Page<AuditLog> getLogs(int page, int size) {
        return auditLogRepository.findAll(PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional
    public AuditLog logAction(String actorEmail, String action, String entityType, String entityId, String detailsJson) {
        AuditLog log = AuditLog.builder()
                .actorEmail(actorEmail != null ? actorEmail : "SYSTEM")
                .action(action)
                .entityType(entityType)
                .entityId(entityId)
                .detailsJson(detailsJson)
                .build();
        return auditLogRepository.save(log);
    }
}
