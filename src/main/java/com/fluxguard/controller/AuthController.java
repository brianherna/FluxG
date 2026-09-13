package com.fluxguard.controller;

import com.fluxguard.dto.ApiResponse;
import com.fluxguard.dto.LoginRequest;
import com.fluxguard.dto.RegisterRequest;
import com.fluxguard.dto.UsuarioDto;
import com.fluxguard.model.Usuario;
import com.fluxguard.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UsuarioDto>> register(@RequestBody RegisterRequest request) {
        String nombre = request.getNombre() != null ? request.getNombre().trim() : "";
        String apellido = request.getApellido() != null ? request.getApellido().trim() : "";
        String email = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        String password = request.getPassword() != null ? request.getPassword() : "";

        if (nombre.isEmpty() || apellido.isEmpty() || email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Todos los campos son obligatorios"));
        }

        if (password.length() < 8) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("La contraseña debe tener al menos 8 caracteres"));
        }

        if (usuarioRepository.existsByCorreo(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error("El correo ya está registrado"));
        }

        String passwordHash = passwordEncoder.encode(password);
        Usuario nuevoUsuario = new Usuario(nombre, apellido, email, passwordHash);
        Usuario guardado = usuarioRepository.save(nuevoUsuario);

        UsuarioDto usuarioDto = new UsuarioDto(
                guardado.getId(),
                guardado.getNombre(),
                guardado.getApellido(),
                guardado.getCorreo(),
                guardado.getFechaRegistro()
        );

        ApiResponse<UsuarioDto> response = ApiResponse.ok("Usuario registrado correctamente");
        response.setUsuario(usuarioDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UsuarioDto>> login(@RequestBody LoginRequest request) {
        String email = request.getEmail() != null ? request.getEmail().trim().toLowerCase() : "";
        String password = request.getPassword() != null ? request.getPassword() : "";

        if (email.isEmpty() || password.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error("Correo y contraseña son obligatorios"));
        }

        Optional<Usuario> optionalUsuario = usuarioRepository.findByCorreo(email);
        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Correo o contraseña incorrectos"));
        }

        Usuario usuario = optionalUsuario.get();
        if (!passwordEncoder.matches(password, usuario.getPasswordHash())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Correo o contraseña incorrectos"));
        }

        UsuarioDto usuarioDto = new UsuarioDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getApellido(),
                usuario.getCorreo(),
                usuario.getFechaRegistro()
        );

        ApiResponse<UsuarioDto> response = ApiResponse.ok("Inicio de sesión correcto");
        response.setUsuario(usuarioDto);
        return ResponseEntity.ok(response);
    }
}
