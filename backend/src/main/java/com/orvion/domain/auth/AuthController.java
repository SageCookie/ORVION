package com.orvion.domain.auth;

import com.orvion.common.dto.ApiResponse;
import com.orvion.domain.auth.dto.AuthResponse;
import com.orvion.domain.auth.dto.LoginRequest;
import com.orvion.security.UserPrincipal;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.login(loginRequest);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> getCurrentUser(@AuthenticationPrincipal UserPrincipal currentUser) {
        AuthResponse response = authService.getCurrentUser(currentUser);
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}
