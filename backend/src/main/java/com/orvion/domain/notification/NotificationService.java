package com.orvion.domain.notification;

import com.orvion.common.dto.ApiResponse;
import com.orvion.common.dto.PagedResponse;
import com.orvion.common.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@Service
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Transactional(readOnly = true)
    public Page<Notification> getMyNotifications(String recipientEmail, int page, int size) {
        return notificationRepository.findByRecipientEmail(recipientEmail, PageRequest.of(page, size, Sort.by("id").descending()));
    }

    @Transactional
    public Notification sendNotification(String recipientEmail, String title, String message, String type) {
        Notification notification = Notification.builder()
                .recipientEmail(recipientEmail)
                .title(title)
                .message(message)
                .type(type != null ? type : "INFO")
                .readStatus(false)
                .build();
        return notificationRepository.save(notification);
    }

    @Transactional
    public void markAsRead(Long id) {
        Notification notif = notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found"));
        notif.setReadStatus(true);
        notificationRepository.save(notif);
    }
}

@RestController
@RequestMapping("/api/v1/notifications")
class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<PagedResponse<Notification>>> getMyNotifications(
            Principal principal,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        String email = principal != null ? principal.getName() : "admin@orvion.com";
        Page<Notification> result = notificationService.getMyNotifications(email, page, size);
        PagedResponse<Notification> paged = PagedResponse.<Notification>builder()
                .content(result.getContent())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .last(result.isLast())
                .build();
        return ResponseEntity.ok(ApiResponse.success(paged));
    }

    @PatchMapping("/{id}/read")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ResponseEntity.ok(ApiResponse.success("Notification marked as read", null));
    }
}
