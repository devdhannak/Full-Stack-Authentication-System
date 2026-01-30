package com.auth.dtos;

import com.auth.entity.Provider;
import com.auth.entity.Role;
import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {

    private UUID id;
    private String name;
    private String email;
    private String password;
    private String image;
    private Boolean enable=false;
    private Instant createdAt = Instant.now(); // this is automatically handled
    private Instant updatedAt = Instant.now(); // this is automatically handled
    private Provider provider = Provider.LOCAL;
    private Set<RoleDTO> roles = new HashSet<>();

}
