package com.orvion.domain.notification;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Entity
@Table(name = "notifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String recipientEmail;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(nullable = false, length = 30)
    private String type = "INFO";

    @Column(nullable = false)
    private Boolean readStatus = false;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    public Notification() {}

    public Notification(Long id, String recipientEmail, String title, String message, String type, Boolean readStatus, Instant createdAt) {
        this.id = id;
        this.recipientEmail = recipientEmail;
        this.title = title;
        this.message = message;
        this.type = type != null ? type : "INFO";
        this.readStatus = readStatus != null ? readStatus : false;
        this.createdAt = createdAt;
    }

    public static NotificationBuilder builder() { return new NotificationBuilder(); }

    public static class NotificationBuilder {
        private Long id;
        private String recipientEmail;
        private String title;
        private String message;
        private String type = "INFO";
        private Boolean readStatus = false;
        private Instant createdAt;

        public NotificationBuilder id(Long id) { this.id = id; return this; }
        public NotificationBuilder recipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; return this; }
        public NotificationBuilder title(String title) { this.title = title; return this; }
        public NotificationBuilder message(String message) { this.message = message; return this; }
        public NotificationBuilder type(String type) { this.type = type; return this; }
        public NotificationBuilder readStatus(Boolean readStatus) { this.readStatus = readStatus; return this; }
        public NotificationBuilder createdAt(Instant createdAt) { this.createdAt = createdAt; return this; }

        public Notification build() {
            return new Notification(id, recipientEmail, title, message, type, readStatus, createdAt);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getRecipientEmail() { return recipientEmail; }
    public void setRecipientEmail(String recipientEmail) { this.recipientEmail = recipientEmail; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public Boolean getReadStatus() { return readStatus; }
    public void setReadStatus(Boolean readStatus) { this.readStatus = readStatus; }
    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }
}
