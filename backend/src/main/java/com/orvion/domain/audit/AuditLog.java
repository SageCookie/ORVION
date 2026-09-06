package com.orvion.domain.audit;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String actorEmail;

    @Column(nullable = false, length = 50)
    private String action;

    @Column(nullable = false, length = 50)
    private String entityType;

    @Column(length = 50)
    private String entityId;

    @Column(columnDefinition = "TEXT")
    private String detailsJson;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant timestamp;

    public AuditLog() {}

    public AuditLog(Long id, String actorEmail, String action, String entityType, String entityId, String detailsJson, Instant timestamp) {
        this.id = id;
        this.actorEmail = actorEmail;
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.detailsJson = detailsJson;
        this.timestamp = timestamp;
    }

    public static AuditLogBuilder builder() { return new AuditLogBuilder(); }

    public static class AuditLogBuilder {
        private Long id;
        private String actorEmail;
        private String action;
        private String entityType;
        private String entityId;
        private String detailsJson;
        private Instant timestamp;

        public AuditLogBuilder id(Long id) { this.id = id; return this; }
        public AuditLogBuilder actorEmail(String actorEmail) { this.actorEmail = actorEmail; return this; }
        public AuditLogBuilder action(String action) { this.action = action; return this; }
        public AuditLogBuilder entityType(String entityType) { this.entityType = entityType; return this; }
        public AuditLogBuilder entityId(String entityId) { this.entityId = entityId; return this; }
        public AuditLogBuilder detailsJson(String detailsJson) { this.detailsJson = detailsJson; return this; }
        public AuditLogBuilder timestamp(Instant timestamp) { this.timestamp = timestamp; return this; }

        public AuditLog build() {
            return new AuditLog(id, actorEmail, action, entityType, entityId, detailsJson, timestamp);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getActorEmail() { return actorEmail; }
    public void setActorEmail(String actorEmail) { this.actorEmail = actorEmail; }
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }
    public String getEntityType() { return entityType; }
    public void setEntityType(String entityType) { this.entityType = entityType; }
    public String getEntityId() { return entityId; }
    public void setEntityId(String entityId) { this.entityId = entityId; }
    public String getDetailsJson() { return detailsJson; }
    public void setDetailsJson(String detailsJson) { this.detailsJson = detailsJson; }
    public Instant getTimestamp() { return timestamp; }
    public void setTimestamp(Instant timestamp) { this.timestamp = timestamp; }
}
